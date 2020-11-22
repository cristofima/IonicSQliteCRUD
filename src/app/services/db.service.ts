import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Song } from '../models/song.model';
import { DateUtil } from '../utils/date.util';

@Injectable({
  providedIn: 'root'
})

export class DbService {
  private storage: SQLiteObject;
  songsList = new BehaviorSubject([]);
  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private platform: Platform, 
    private sqlite: SQLite, 
    private httpClient: HttpClient,
    private sqlPorter: SQLitePorter,
  ) {
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'songs.db',
        location: 'default'
      })
      .then((db: SQLiteObject) => {
          this.storage = db;
          this.getFakeData();
      });
    });
  }

  dbState() {
    return this.isDbReady.asObservable();
  }
 
  fetchSongs(): Observable<Song[]> {
    return this.songsList.asObservable();
  }

  getFakeData() {
    this.httpClient.get(
        'assets/sql/dump.sql', 
        {responseType: 'text'}
    ).subscribe(data => {
        this.sqlPorter.importSqlToDb(this.storage, data)
          .then(_ => {
            this.getSongs();
            this.isDbReady.next(true);
          })
          .catch(error => console.error(error));
    });
  }

  getSongs(){
    return this.storage.executeSql('SELECT * FROM songs', []).then(res => {
      let items: Song[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) { 
          items.push({ 
            id: res.rows.item(i).id,
            artistName: res.rows.item(i).artistName,  
            songName: res.rows.item(i).songName,
            creationDate: DateUtil.getStringDateFromUnixTimeStamp(res.rows.item(i).creationDate)
           });
        }
      }
      this.songsList.next(items);
    });
  }

  addSong(artistName: string, songName: string, creationDate: string) {
    let data = [artistName, songName, DateUtil.getUnixTime(creationDate)];
    return this.storage.executeSql('INSERT INTO songs (artistName, songName, creationDate) VALUES (?, ?, ?)', data)
    .then(res => {
      this.getSongs();
    });
  }
 
  getSong(songId: number): Promise<Song> {
    return this.storage.executeSql('SELECT * FROM songs WHERE id = ?', [songId]).then(res => { 
      return {
        id: res.rows.item(0).id,
        artistName: res.rows.item(0).artistName,  
        songName: res.rows.item(0).songName,
        creationDate: DateUtil.getStringDateFromUnixTimeStamp(res.rows.item(0).creationDate)
      }
    });
  }

  updateSong(songId: number, song: any) {
    let data = [song.artistName, song.songName, DateUtil.getUnixTime(song.creationDate)];
    return this.storage.executeSql(`UPDATE songs SET artistName = ?, songName = ?, creationDate = ? WHERE id = ${songId}`, data)
    .then(data => {
      this.getSongs();
    })
  }

  deleteSong(songId: number) {
    return this.storage.executeSql('DELETE FROM songs WHERE id = ?', [songId])
    .then(_ => {
      this.getSongs();
    });
  }
}