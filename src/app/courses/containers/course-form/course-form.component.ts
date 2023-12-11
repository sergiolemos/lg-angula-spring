import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CoursesService } from '../../services/courses.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {


  form = this.formBuilder.group({
    name: [''],
    category: ['']
  });


  constructor(
    private formBuilder: NonNullableFormBuilder,
    private service: CoursesService,
    private snackBar: MatSnackBar,
    private location: Location
  ) {
    //this.form ;
  }

  ngOnInit(): void {

  }

  onSubmit() {
    this.service.save(this.form.value)
      .subscribe(result => this.onSuccess(), error=>this.onErroSnackBar('Erro ao salvar'));
  }
  onCancel() {
    this.location.back();
  }

  private onSuccess(){
    this.snackBar.open('Curso salvo com sucesso'),'',{duration:5000};
    this.location.back();
  }

  private onErroSnackBar(msg: string){
    this.snackBar.open(msg,'',{duration:5000});
  }

}
