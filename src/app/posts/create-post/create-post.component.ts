import { PostsService } from './../posts.service';
import { Component, OnInit, } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../post.model';
import { StateService } from '../../state.service';


@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  private post: Post;
  public isLoading = false;
  public form: FormGroup;
  private mode = 'create';
  private postId: string;

  constructor(
    private postsService: PostsService,
    private stateService: StateService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      content: new FormControl(null, { validators: [Validators.required] })
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.stateService.myMode.next(this.mode);
        this.postId = paramMap.get('postId');
        this.isLoading = true;
        this.postsService.getPost(this.postId).subscribe(postData => {
          this.isLoading = false;
          this.post = {
            id: postData._id,
            title: postData.title,
            content: postData.content,
            creator: postData.creator
          };
          this.form.setValue({
            title: this.post.title,
            content: this.post.content
          });
        }, error => {
          this.isLoading = false;
          console.log(error);
        });
      } else {
        this.mode = 'create';
        this.postId = null;
        this.stateService.myMode.next(this.mode);
        // this.dataService.changeMode(this.mode);
      }
    });
  }

  onClickSave() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create') {
      this.postsService.addPost(this.form.value.title, this.form.value.content);
    } else {
      this.postsService.updatePost(
        this.postId,
        this.form.value.title,
        this.form.value.content
      );
    }
    this.form.reset();
  }
}
