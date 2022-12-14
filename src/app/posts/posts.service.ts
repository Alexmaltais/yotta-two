import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { Post } from './post.model';

@Injectable({ providedIn: 'root' })
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient, private router: Router) {}

  public getPosts(): void {
    this.http
      .get<{message: string, posts: any}>('http://localhost:3000/api/posts')
      .pipe(map((postData) => {
        return postData.posts.map(post => {
          return {
            title: post.title,
            content: post.content,
            id: post._id,
            creator: post.creator
          };
        });
      }))
      .subscribe(transformedPosts => {
        this.posts = transformedPosts;
        this.postsUpdated.next([...this.posts]);
      }, error => {
        console.log(error);
      });
  }

  public getPostUpdateListener(): Observable<Post[]> {
    return this.postsUpdated.asObservable();
  }

  public getPost(id: string): Observable<{
    _id: string, title: string, content: string, creator: string
  }> {
    return this.http.get<{
      _id: string,
      title: string,
      content: string,
      creator: string;
    }>('http://localhost:3000/api/posts/' + id);
  }

  public addPost(title: string, content: string): void {
    const post: Post = {id: null, title: title, content: content, creator: null };
    this.http
      .post<{message: string, postId: string }>('http://localhost:3000/api/posts', post)
      .subscribe(responseData => {
        const id = (responseData.postId);
        post.id = id;
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(['/']);
    }, error => {
      console.log(error);
    });
  }

  public updatePost(id: string, title: string, content: string): void {
    const post: Post = { id: id, title: title, content: content, creator: null };
    this.http.put('http://localhost:3000/api/posts/' + id, post)
      .subscribe(response => {
        const updatedPosts = [...this.posts];
        const oldPostIndex = updatedPosts.findIndex(p => p.id === post.id);
        updatedPosts[oldPostIndex] = post;
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(['/']);
      }, error => {
        console.log(error);
      });
  }

  public deletePost(postId: string): void {
    this.http.delete('http://localhost:3000/api/posts/' + postId)
      .subscribe(() => {
        const updatedPosts = this.posts.filter(post => post.id !== postId);
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
      }, error => {
        console.log(error);
      });
  }

}
