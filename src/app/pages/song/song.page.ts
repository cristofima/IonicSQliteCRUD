import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { NavController } from '@ionic/angular';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-song',
  templateUrl: './song.page.html',
  styleUrls: ['./song.page.scss'],
})
export class SongPage implements OnInit {
  editForm: FormGroup;
  id: number;

  constructor(
    private db: DbService,
    public formBuilder: FormBuilder,
    private actRoute: ActivatedRoute,
    private navController: NavController
  ) {
    
  }

  ngOnInit() {
    this.editForm = this.formBuilder.group({
      artistName: new FormControl('', Validators.required),
      songName: new FormControl('', Validators.required),
      creationDate: new FormControl('', Validators.required),
    });

    this.id = Number(this.actRoute.snapshot.paramMap.get('id'));

    this.db.getSong(this.id).then(res => {
      this.editForm.setValue({
        artistName: res['artistName'],
        songName: res['songName'],
        creationDate: res['creationDate']
      })
    })
  }

  saveForm(){
    this.db.updateSong(this.id, this.editForm.value)
    .then(() => {
      this.navController.back();
    })
  }

}