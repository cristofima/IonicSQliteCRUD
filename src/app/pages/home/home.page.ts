import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { ToastController } from '@ionic/angular';
import { Song } from 'src/app/models/song.model';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {
  mainForm: FormGroup;
  songList: Song[] = []

  constructor(
    private db: DbService,
    public formBuilder: FormBuilder,
    private toast: ToastController
  ) { }

  ngOnInit() {
    this.db.dbState().subscribe((res) => {
      if(res){
        this.db.fetchSongs().subscribe(item => {
          this.songList = item
        })
      }
    });

    this.mainForm = this.formBuilder.group({
      artistName: new FormControl('', Validators.required),
      songName: new FormControl('', Validators.required),
      creationDate: new FormControl('', Validators.required)
    })
  }

  storeData() {
    this.db.addSong(
      this.mainForm.value.artistName,
      this.mainForm.value.songName,
      this.mainForm.value.creationDate
    ).then(() => {
      this.mainForm.reset();
    })
  }

  deleteSong(songId: number){
    this.db.deleteSong(songId).then(async(res) => {
      let toast = await this.toast.create({
        message: 'Song deleted',
        duration: 2500
      });
      toast.present();      
    })
  }
   
}