import { Component, OnInit, Input } from '@angular/core';
import { WpService } from 'src/app/services/wpservice.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  postStatus: boolean = true;
  @Input() postId: number;
  commentForm: FormGroup;
  emailMsg: string;
  commentData: {};

  private ValidationMsg = {
    required: 'Please enter your email address',
    email: 'Please enter a valid email address'
  }

  //comment sucess
  commentstatus: boolean = false;
  
  commentstatustimingout: boolean;
  private success = {
    icon: 'done',
    message: 'posted'
  }
  private failure = {
    icon: 'sms_failed',
    message: 'we are unable to post your comment at this moment. Please check your network and try again.'
  }
  request: { icon: string; message: string; } = this.failure;
  //----------
  postComments: any;
  showLoader: boolean = false;
  formLoaderexpression: boolean = false;
  

  constructor(private wpService: WpService, private fb: FormBuilder) { }

  ngOnInit() {
    
    this.onload();
    
  }

  async onload(){
    this.commentForm = this.fb.group({
      commentName: ['', [Validators.required, Validators.maxLength(30)]],
      commentEmail: ['', [Validators.required, Validators.email]],
      commentText: ['', [Validators.required, Validators.maxLength(225)]],

    });
    this.getComments();
    /* this.commentForm.get('commentText').valueChanges.subscribe(
      value => console.log(value)
    ); */
    const emailControl = this.commentForm.get('commentEmail');
    emailControl.valueChanges.pipe(
      debounceTime(1000)
    ).subscribe(
      value => this.setEmailMsg(emailControl)
    );
    await this.wpService.getToken();
  }
  setEmailMsg(c: AbstractControl): void{
    this.emailMsg ='';
    if((c.touched || c.dirty) && c.errors){ 
      this.emailMsg = Object.keys(c.errors).map(
        key => this.ValidationMsg[key]).join(' ');
    }
  }

  commentStatus(passInboolean: boolean){
    this.commentstatus = passInboolean;

    

    if(this.commentstatus === true){
      //timeout should start
    this.commentstatustimingout = true;

      this.request = this.failure;

      //remove after 8s
      setTimeout(()=>{
        this.commentstatustimingout = false
      }, 8000);
    }
    
  }
  postComment(){
    //hide form while trying to submit
    this.formLoaderexpression = true;
    //show loader before posting comment
    this.showLoader = true;
    

    console.log("commentin... ");
    console.log(this.commentForm);
    this.commentData = {
      token: this.wpService.tokenData.token,
        name: `${this.commentForm.value.commentName}`,
        email: `${this.commentForm.value.commentEmail}`,
        content: `${this.commentForm.value.commentText}`,
        postID: this.postId,
    }
    this.wpService.comment(this.commentData).subscribe(
      data => {
        console.log(data)
        console.log("successfully commented")

        //hide form while trying to submit
        this.formLoaderexpression = false;

        //remove loader
        this.showLoader = false;

        //sucess msg display 
        this.commentStatus(false);

        this.onload();
      },
      err => {
        console.log(err);
        //remove loader
        this.showLoader = false;
        //sucess msg display 
        this.commentStatus(true);
        //hide form while trying to submit
        this.formLoaderexpression = false;
      } 
    );
  }
  getComments(){
    this.wpService.getPostComments(this.postId).subscribe(
      data =>{ 
        this.postComments = data;
        console.log("comments available: ",this.postComments);
        if(this.postComments.length !== 0){
          console.log('postStatus gottten');
          this.postStatus = false;
        }
      }
    );
  }
  
  /* setNotification(d){
    const textControl = this.commentForm.get('commentText');
    if(d == null){
      textControl.setValidators(Validators.required)
    }else{
      textControl.clearValidators();
    }
    textControl.updateValueAndValidity();
  } */
}
