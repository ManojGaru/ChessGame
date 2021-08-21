import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild, Renderer2, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { NgxChessBoardView, NgxChessBoardService, NgxChessBoardComponent } from 'ngx-chess-board';
import { ApiService } from '../api.service';
import { UtilService } from '../util.service';
import * as Chess from 'chess.js';
import parser from '@mliebelt/pgn-parser'
import { images, boardPieces } from '../boardimages';

@Component({
  selector: 'app-chess-board-analytics',
  templateUrl: './chess-board-analytics.page.html',
  styleUrls: ['./chess-board-analytics.page.scss'],
})
export class ChessBoardAnalyticsPage implements OnInit {
  @ViewChild('boardchess', { static: false }) board: NgxChessBoardView;
  @ViewChild('boardchess', { static: false }) board111: NgxChessBoardComponent;
  @ViewChild("divMessages", { static: true }) private divMessages: ElementRef;

  public darkTileColor = '#b88942';
  public lightTileColor = '#ffffff';
  public size = 300;
  token: string;
  id: string;
  chess: any;
  pgnid: any;
  pgnDetails: any;
  fen: any = '';
  future: any = [];
  parsedResult: any = [];
  boardImages: any = []
  chs: any = new Chess();
  chsss: any = new Chess();
  color: any = '#FFFFFF';
  publicFEN: any = '';
  isFEN: any = false;
  isThemeChangeEnabled: any = false;
  isPlaying: any = false;
  fileTransfer: FileTransferObject;
  dragndraw: any = true;
  route: any = '/alpha/'
  pieceRoutes: any = boardPieces;
  pieces: any = {
    whiteKingUrl: '',
    whiteQueenUrl: '',
    whiteKnightUrl: '',
    whiteRookUrl: '',
    whitePawnUrl: '',
    whiteBishopUrl: '',
    blackKingUrl: '',
    blackQueenUrl: '',
    blackKnightUrl: '',
    blackRookUrl: '',
    blackPawnUrl: '',
    blackBishopUrl: ''
  };
  isPieceEnabled: any = false;
  publicPGN: any;
  isPGN: any = false;
  cboard: any;
  iswhite: any = false;
  // pieces:any={
  //   whiteKingUrl:'https://media.wired.com/photos/5b899992404e112d2df1e94e/master/pass/trash2-01.jpg'
  // } 
  constructor(private router: Router, private api: ApiService,
    private util: UtilService, private activatedRoute: ActivatedRoute,
    private renderer: Renderer2, private ngxChessBoardService: NgxChessBoardService,
    private fileChooser: FileChooser, private filePath: FilePath, private file: File,
    private fileOpener: FileOpener, private transfer: FileTransfer) {

    let piece_url = localStorage.getItem('piece_url');
    if (piece_url) {
      this.pieces.whiteKingUrl = '../../assets/image/piece' + piece_url + 'wK.svg';
      this.pieces.whiteQueenUrl = '../../assets/image/piece' + piece_url + 'wQ.svg'
      this.pieces.whiteKnightUrl = '../../assets/image/piece' + piece_url + 'wN.svg';
      this.pieces.whiteRookUrl = '../../assets/image/piece' + piece_url + 'wR.svg'
      this.pieces.whitePawnUrl = '../../assets/image/piece' + piece_url + 'wP.svg';
      this.pieces.whiteBishopUrl = '../../assets/image/piece' + piece_url + 'wB.svg'

      this.pieces.blackKingUrl = '../../assets/image/piece' + piece_url + 'bK.svg';
      this.pieces.blackQueenUrl = '../../assets/image/piece' + piece_url + 'bQ.svg'
      this.pieces.blackKnightUrl = '../../assets/image/piece' + piece_url + 'bN.svg';
      this.pieces.blackRookUrl = '../../assets/image/piece' + piece_url + 'bR.svg'
      this.pieces.blackPawnUrl = '../../assets/image/piece' + piece_url + 'bP.svg';
      this.pieces.blackBishopUrl = '../../assets/image/piece' + piece_url + 'bB.svg'
    } else {
      this.pieces.whiteKingUrl = '../../assets/image/piece' + this.route + 'wK.svg';
      this.pieces.whiteQueenUrl = '../../assets/image/piece' + this.route + 'wQ.svg'
      this.pieces.whiteKnightUrl = '../../assets/image/piece' + this.route + 'wN.svg';
      this.pieces.whiteRookUrl = '../../assets/image/piece' + this.route + 'wR.svg'
      this.pieces.whitePawnUrl = '../../assets/image/piece' + this.route + 'wP.svg';
      this.pieces.whiteBishopUrl = '../../assets/image/piece' + this.route + 'wB.svg'

      this.pieces.blackKingUrl = '../../assets/image/piece' + this.route + 'bK.svg';
      this.pieces.blackQueenUrl = '../../assets/image/piece' + this.route + 'bQ.svg'
      this.pieces.blackKnightUrl = '../../assets/image/piece' + this.route + 'bN.svg';
      this.pieces.blackRookUrl = '../../assets/image/piece' + this.route + 'bR.svg'
      this.pieces.blackPawnUrl = '../../assets/image/piece' + this.route + 'bP.svg';
      this.pieces.blackBishopUrl = '../../assets/image/piece' + this.route + 'bB.svg'
    }

    this.fileTransfer = this.transfer.create();

    this.token = localStorage.getItem('token');
    this.id = this.activatedRoute.snapshot.paramMap.get('id')
    //console.log(this.id, 'this is the id from dashboard');
    this.pgnid = this.activatedRoute.snapshot.paramMap.get('pgnid')
    // console.log(this.pgnid, 'this is the id from dashboard');


  }
  ngOnInit() {

  }
  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
  changeTheme() {
    this.isThemeChangeEnabled = !this.isThemeChangeEnabled;
  }

  ionViewWillEnter() {
    let bbb: HTMLElement = document.getElementById('boardchess');
    let bbb1: HTMLElement = document.getElementById('drag');
    // this.renderer.setStyle(bbb, 'pointer-events', 'none')
    let parent = bbb.children[0].children[0]
    //  console.log(this.board111.board.currentWhitePlayer);
    if (this.board111.board) {
      if (this.board111.board.currentWhitePlayer === true) { this.iswhite = true } else { this.iswhite = false }

    }

    // this.renderer.setAttribute(bbb,"class",'bb1');
    this.renderer.setStyle(bbb, 'padding', '10px')

    this.renderer.setStyle(bbb, 'border-radius', '7px')
    this.renderer.setStyle(bbb1, 'border', '1px solid #f8f8f8')
    let image = localStorage.getItem('chess_image');
    if (image) {
      let img = JSON.parse(image);



      // this.renderer.setAttribute(bbb,"class",'bb1');
      this.renderer.setStyle(bbb, 'padding', '10px')
      this.renderer.setStyle(bbb, 'background-color', img.border)
      this.renderer.setStyle(bbb, 'border-radius', '7px')
      this.renderer.setStyle(bbb1, 'border', '1px solid #f8f8f8')

      for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
          if (i % 2 === j % 2) {


            this.renderer.setStyle(parent.children[i].children[j], 'background-image', 'url("' + img.even + '")');
            this.renderer.setStyle(parent.children[i].children[j], 'background-size', 'contain');
            // this.renderer.setStyle(parent.children[i].children[j], 'z-index', '999999999999')
            this.renderer.setStyle(parent.children[i].children[j], 'background-color', '')
          } else {
            this.renderer.setStyle(parent.children[i].children[j], 'background-image', 'url("' + img.odd + '")');
            this.renderer.setStyle(parent.children[i].children[j], 'background-size', 'contain');
            // this.renderer.setStyle(parent.children[i].children[j], 'z-index', '999999999999')
            this.renderer.setStyle(parent.children[i].children[j], 'background-color', '')
          }

        }


      }

    } else {
      this.renderer.setStyle(bbb, 'background-color', this.darkTileColor)
    }
    // window.caches.delete()
    this.boardImages = images
    this.util.presentLoading();

    this.api.chessBoard(this.id, this.token).subscribe((res: any) => {
      console.log(res);
      this.chess = res;
    }, (err: HttpErrorResponse) => {
      console.log(err);

    })





    this.api.chessBoardDetails(this.pgnid, this.token).subscribe((res: any) => {

      this.pgnDetails = res.content[0].content
      // this.createAccessLogFileAndWrite(this.pgnDetails)

      this.parsedResult = parser.parse(this.pgnDetails)[0]
      console.log(this.parsedResult);

      for (var k = 0; k < this.parsedResult.length; k++) {
        this.chs.move(this.parsedResult[k].notation.notation);
        // console.log(this.parsedResult[k]);

      }
      this.board.setFEN(this.chs.fen())



      for (var i = 0, j = 1; i < this.parsedResult.length; i = i + 2, j++) {

        // this.chs.move(this.parsedResult[i].notation.notation);
        let li = this.renderer.createElement('div');
        this.renderer.setProperty(li, 'id', 'pgn')
        const text = this.renderer.createText([j] + ". ");
        var root = this;
        //append text to li element
        this.renderer.appendChild(li, text);
        let pp = document.createElement("button");
        pp.style.backgroundColor = 'transparent';
        pp.style.color = '#FFF';
        pp.style.textDecorationLine = 'underline';
        pp.style.fontSize = '20px'
        pp.style.width = '60%'
        pp.style.textAlign = "center"
        pp.style.borderRight = '1px solid #ecc023'

        pp.innerText = this.parsedResult[i].notation.notation;
        pp.onclick = function (event: any) {

          let ft = [];
          // ft.push(event.target.innerText)
          var tmp = new Chess();
          for (let m = 0; m <= root.parsedResult.length; m++) {
            if (root.parsedResult[m].notation.notation !== event.target.innerText) {

              ft.push(root.parsedResult[m].notation.notation)

            } else {
              ft.push(event.target.innerText)
              break;
            }
          }
          console.log(ft);
          ft.forEach(e => {

            tmp.move(e);
            //  root.chs.move(e)

          })
          root.chsss = tmp;
          root.board.setFEN(tmp.fen())
          root.future = []
        }

        li.appendChild(pp);

        let ppp = document.createElement("button");
        ppp.style.backgroundColor = 'transparent';
        ppp.style.color = '#FFF';
        ppp.style.textDecorationLine = 'underline';
        ppp.style.fontSize = '20px'
        ppp.style.marginLeft = '50px'
        ppp.style.width = '40%'
        ppp.style.textAlign = "center"
        if (this.parsedResult[(i + 1)]) {
          ppp.innerText = this.parsedResult[(i + 1)].notation.notation;
        }

        ppp.onclick = function (event: any) {

          let ft = [];
          var tmp = new Chess();
          // ft.push(event.target.innerText)
          for (let m = 0; m <= root.parsedResult.length; m++) {
            if (root.parsedResult[m].notation.notation !== event.target.innerText) {
              ft.push(root.parsedResult[m].notation.notation)

            } else {
              ft.push(event.target.innerText)
              break;
            }
          }
          console.log(ft);
          ft.forEach(e => {

            tmp.move(e);

          })
          root.chsss = tmp;
          root.board.setFEN(tmp.fen())
          root.future = []
        }
        li.appendChild(ppp);
        li.setAttribute("class", "li");
        this.renderer.appendChild(this.divMessages.nativeElement, li);

      }


    }, (err: HttpErrorResponse) => {
      console.log(err);

    })


  }
  back() {
    var moves = this.chsss.history();
    if (moves.length > 0) {
      moves = this.chsss.history();
    } else {
      moves = this.chs.history();
    }
    var tmp = new Chess();

    console.log(this.future, 'ffffffffffffffffffffffff');


    var previous = moves.length - this.future.length - 1;
    for (var i = 0; i < previous; i++) {
      tmp.move(moves[i]);
    }
    var previous_fen = tmp.fen();
    tmp.move(moves[previous]);
    if (previous_fen !== 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1') {
      this.future.push(tmp.fen());
    }
    // if (previous_fen === 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1' && this.future.length > 0) {
    //   let ft = this.future;
    //   previous_fen = ft.pop();
    // }
    this.board.setFEN(previous_fen)

  }
  forward() {
    console.log(this.future);

    let d = this.future.pop();
    if (d) {
      this.board.setFEN(d)
    }

  }
  extremeBack() {
    this.future = [];
    var moves = this.chs.history();
    var tmp = new Chess();
    var previous = moves.length;
    for (var i = 0; i < previous; i++) {
      // console.log(moves[i]);

      tmp.move(moves[i]);


      var previous_fen = tmp.fen();
      //  console.log(previous_fen);
      if (previous_fen !== 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1') {
        this.future.push(previous_fen);
      }
    }
    // console.log(this.future);

    // this.future.sort((one, two) => (one > two ? 1 : -1));
    this.future = this.future.map((item, idx) => this.future[this.future.length - 1 - idx])
    // console.log(this.future);

    this.board.reset();
  }
  // extremeForward() {
  //   for (var k = 0; k < this.parsedResult.length; k++) {
  //     this.chs.move(this.parsedResult[k].notation.notation);
  //     // console.log(this.parsedResult[k]);

  //   }
  //   this.board.setFEN(this.chs.fen())
  // }

  extremeForward() {
    var moves = this.chs.history();
    var tmp = new Chess();
    for (var i = 0; i < moves.length; i++) {
      tmp.move(moves[i]);
    }
    this.board.setFEN(tmp.fen());
    this.future = []
  }

  getMoves(event) {

    this.cboard = this.chs.board();

    var move = this.chs.move({
      from: event.move.substring(0, 2),
      to: event.move.substring(2, 4),
      promotion: 'q' // NOTE: always promote to a queen for example simplicity
    })
    if (move === null) return 'snapback';
    setTimeout(() => {
      this.makeRandomMove();

      // console.log(this.board111);
    }, 1000)

    // }
    // else {
    //   this.util.presentAlert('please press on play button');


    // }


  }

  makeRandomMove() {

    let bbb: HTMLElement = document.getElementById('boardchess');
    let bbb1: HTMLElement = document.getElementById('drag');

    let parent = bbb.children[0].children[0]
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        this.renderer.setStyle(parent.children[i].children[j], 'border', '0px solid yellow');


      }
    }
    var possibleMoves = this.chs.moves();
    if (possibleMoves.length === 0) return
    var randomIdx = Math.floor(Math.random() * possibleMoves.length)
    this.chs.move(possibleMoves[randomIdx])

    this.board.setFEN(this.chs.fen())

    this.compare(this.cboard, this.chs.board())


    console.log(this.board111, parent, this.chs, this.cboard, this.chs.board());
    if (this.board111.board) {
      if (this.board111.board.currentWhitePlayer === true) { this.iswhite = true } else { this.iswhite = false }

    } setTimeout(() => {
      var elem = document.getElementById('divMessagess');
      elem.innerHTML = ''
      let parsedData = this.chs.history()
      for (var i = 0, j = 1; i < parsedData.length; i = i + 2, j++) {

        // this.chs.move(this.parsedResult[i].notation.notation);
        let li = this.renderer.createElement('div');
        this.renderer.setProperty(li, 'id', 'pgn')
        const text = this.renderer.createText([j] + ". ");
        var root = this;
        //append text to li element
        this.renderer.appendChild(li, text);
        let pp = document.createElement("button");
        pp.style.backgroundColor = 'transparent';
        pp.style.color = '#FFF';
        pp.style.textDecorationLine = 'underline';
        pp.style.fontSize = '20px'
        pp.style.width = '60%'
        pp.style.textAlign = "center"
        pp.style.borderRight = '1px solid #ecc023'

        pp.innerText = parsedData[i];
        pp.onclick = function (event: any) {

          let ft = [];
          // ft.push(event.target.innerText)
          var tmp = new Chess();
          for (let m = 0; m <= parsedData.length; m++) {
            if (parsedData[m] !== event.target.innerText) {

              ft.push(parsedData[m])

            } else {
              ft.push(event.target.innerText)
              break;
            }
          }
          console.log(ft);
          ft.forEach(e => {

            tmp.move(e);

          })
          root.chsss = tmp;
          root.board.setFEN(tmp.fen())
          root.future = []
        }

        li.appendChild(pp);

        let ppp = document.createElement("button");
        ppp.style.backgroundColor = 'transparent';
        ppp.style.color = '#FFF';
        ppp.style.textDecorationLine = 'underline';
        ppp.style.fontSize = '20px'
        ppp.style.width = '40%'
        ppp.style.textAlign = "center"
        ppp.style.borderRight = '1px solid #ecc023'

        if (parsedData[(i + 1)]) {
          console.log();

          ppp.innerText = parsedData[(i + 1)];
        }

        ppp.onclick = function (event: any) {

          let ft = [];
          var tmp = new Chess();
          // ft.push(event.target.innerText)
          for (let m = 0; m <= parsedData.length; m++) {
            if (parsedData[m] !== event.target.innerText) {
              ft.push(parsedData[m])

            } else {
              ft.push(event.target.innerText)
              break;
            }
          }
          console.log(ft);
          ft.forEach(e => {

            tmp.move(e);

          })
          root.chsss = tmp;
          root.board.setFEN(tmp.fen())
          root.future = []
        }
        li.appendChild(ppp);
        li.setAttribute("class", "li");
        this.renderer.appendChild(this.divMessages.nativeElement, li);

      }
    }, 1000)

  }

  compare(board1, borad2) {

    //Iterate through all elements in first array
    for (var x = 0; x < board1.length; x++) {

      //Iterate through all elements in second array    
      for (var y = 0; y < borad2.length; y++) {
        if (board1[x][y]?.type !== borad2[x][y]?.type) {
          console.log(x, y);
          let bbb: HTMLElement = document.getElementById('boardchess');
          let parent = bbb.children[0].children[0];

          for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {

              if (i === x && j === y) {
                console.log(i, j, '.................');
                this.renderer.setStyle(parent.children[i].children[j], 'border', '2px solid yellow');
                this.renderer.setStyle(parent.children[i].children[j], 'background-color', 'transparent');
                this.renderer.setStyle(parent.children[i].children[j], 'background-image', 'null');
              }
            }
          }
        }
      }
    }
  }

  ngAfterViewInit() {
    let parent: HTMLElement = document.getElementById('boardchess');
  }
  flipBoard() {
    this.board.reverse()
  }

  colorChange(event) {
    console.log(event);
    let bbb: HTMLElement = document.getElementById('boardchess');
    let bbb1: HTMLElement = document.getElementById('drag');

    // this.renderer.setAttribute(bbb,"class",'bb1');
    this.renderer.setStyle(bbb, 'padding', '10px')
    this.renderer.setStyle(bbb, 'background-color', event)
    this.renderer.setStyle(bbb, 'border-radius', '7px')
    this.renderer.setStyle(bbb1, 'border', '1px solid #f8f8f8')
  }

  resetImage() {
    this.isThemeChangeEnabled = false;
    localStorage.removeItem('chess_image')
    let temppp: HTMLElement = document.getElementById('boardchess');
    console.log(temppp);
    let parent = temppp.children[0].children[0]


    // let bbb: HTMLElement = document.getElementById('ngxboard');
    let bbb1: HTMLElement = document.getElementById('drag');

    // this.renderer.setAttribute(bbb,"class",'bb1');
    this.renderer.setStyle(temppp, 'padding', '10px')
    this.renderer.setStyle(temppp, 'background-color', this.darkTileColor)
    this.renderer.setStyle(temppp, 'border-radius', '7px')
    this.renderer.setStyle(bbb1, 'border', '1px solid #f8f8f8')


    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (i % 2 === j % 2) {
          this.renderer.setStyle(parent.children[i].children[j], 'background-image', '');
          this.renderer.setStyle(parent.children[i].children[j], 'background-color', '#FFF');
          // this.renderer.setStyle(parent.children[i].children[j], 'z-index', '1000000')
        } else {
          this.renderer.setStyle(parent.children[i].children[j], 'background-image', '');
          this.renderer.setStyle(parent.children[i].children[j], 'background-color', this.darkTileColor);
          // this.renderer.setStyle(parent.children[i].children[j], 'z-index', '1000000')
        }

      }

    }
  }
  imageClick(image) {
    console.log(image);
    localStorage.setItem('chess_image', JSON.stringify(image))

    let temppp: HTMLElement = document.getElementById('boardchess');
    console.log(temppp);
    let parent = temppp.children[0].children[0]

    let bbb1: HTMLElement = document.getElementById('drag');

    // this.renderer.setAttribute(bbb,"class",'bb1');
    this.renderer.setStyle(temppp, 'padding', '10px')
    this.renderer.setStyle(temppp, 'background-color', image.border)
    this.renderer.setStyle(temppp, 'border-radius', '7px')
    this.renderer.setStyle(bbb1, 'border', '1px solid #f8f8f8')


    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (i % 2 === j % 2) {


          this.renderer.setStyle(parent.children[i].children[j], 'background-image', 'url("' + image.even + '")');
          this.renderer.setStyle(parent.children[i].children[j], 'background-size', 'contain');
          // this.renderer.setStyle(parent.children[i].children[j], 'z-index', '999999999')
        } else {
          this.renderer.setStyle(parent.children[i].children[j], 'background-image', 'url("' + image.odd + '")');
          this.renderer.setStyle(parent.children[i].children[j], 'background-size', 'contain');
          //this.renderer.setStyle(parent.children[i].children[j], 'z-index', '999999999')
        }

      }


    }


  }
  setFEN() {
    return 'r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R'
  }
  reset() {
    this.board.reset();
  }


  uploadPgn() {
    this.fileChooser.open().then(uri => {
      console.log(uri);
      this.filePath.resolveNativePath(uri).then((path) => {
        console.log(path);
        this.chs.load_pgn(path)
        let pathf = path.substring(0, path.lastIndexOf('/'));
        let filen = path.substring(path.lastIndexOf('/') + 1, path.length);
        console.log(pathf, '.........................', filen);
        //  this.fileOpener.open(path,'application/pdff').then((rrr)=>{
        //    console.log(rrr);

        //  })

        this.file.readAsText(pathf, filen).then((data) => {
          console.log(data);
          // console.log(data.split('\n'));
          // let temp = new Chess()
          this.chs.load_pgn(data);
          this.board.setFEN(this.chs.fen())
          var elem = document.getElementById('divMessagess');
          elem.innerHTML = ''
          let tttt = [];

          var prms = new Promise((resolve, reject) => {

            let ttt = parser.parse(data)
            tttt = ttt[0]
            console.log(tttt, '.......................................');
            resolve(true)
          })

          prms.then((res) => {
            if (res === true) {
              for (var i = 0, j = 1; i <= tttt.length - 1; i = i + 2, j++) {
                console.log(i, j, tttt[i], 'kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk');

                // this.renderer.destroy()
                // this.chs.move(this.parsedResult[i].notation.notation);
                // console.log(tttt[i].notation.notation);

                let li = this.renderer.createElement('div');
                this.renderer.setProperty(li, 'id', 'pgn')
                const text = this.renderer.createText([j] + ". ");
                var root = this;
                //append text to li element        
                this.renderer.appendChild(li, text);
                let pp = document.createElement("button");
                pp.style.backgroundColor = 'transparent';
                pp.style.color = '#FFF';
                pp.style.textDecorationLine = 'underline';
                pp.style.fontSize = '20px'
                pp.style.width = '60%'
                pp.style.textAlign = "center"
                pp.style.borderRight = '1px solid #ecc023'
                pp.innerText = tttt[i].notation.notation;
                pp.onclick = function (event: any) {

                  let ft = [];
                  // ft.push(event.target.innerText)
                  var tmp = new Chess();
                  for (let m = 0; m <= tttt.length; m++) {
                    if (tttt[m].notation.notation !== event.target.innerText) {

                      ft.push(tttt[m].notation.notation)

                    } else {
                      ft.push(event.target.innerText)
                      break;
                    }
                  }
                  console.log(ft);
                  ft.forEach(e => {

                    tmp.move(e);

                  })
                  root.chsss = tmp;
                  root.board.setFEN(tmp.fen())

                }

                li.appendChild(pp);

                let ppp = document.createElement("button");
                ppp.style.backgroundColor = 'transparent';
                ppp.style.color = '#FFF';
                ppp.style.textDecorationLine = 'underline';
                ppp.style.fontSize = '20px'
                ppp.style.width = '40%'
                ppp.style.textAlign = "center"
                ppp.style.borderRight = '1px solid #ecc023'
                ppp.innerText = tttt[(i + 1)].notation.notation;
                ppp.onclick = function (event: any) {

                  let ft = [];
                  var tmp = new Chess();
                  // ft.push(event.target.innerText)
                  for (let m = 0; m <= tttt.length; m++) {
                    if (tttt[m].notation.notation !== event.target.innerText) {
                      ft.push(tttt[m].notation.notation)

                    } else {
                      ft.push(event.target.innerText)
                      break;
                    }
                  }
                  console.log(ft);
                  ft.forEach(e => {

                    tmp.move(e);

                  })
                  root.chsss = tmp;
                  root.board.setFEN(tmp.fen())

                }
                li.appendChild(ppp);
                li.setAttribute("class", "li");
                this.renderer.appendChild(this.divMessages.nativeElement, li);
              }
            }
          }).catch((error) => {
            console.log(error);
            this.util.presentAlert(error.name)

          })


        }).catch(err => console.log(err));
      })
    });
  }
  uploadFen() {
    this.fileChooser.open().then(uri => {
      console.log(uri);
      this.filePath.resolveNativePath(uri).then((path) => {
        console.log(path);
        this.chs.load_pgn(path)
        let pathf = path.substring(0, path.lastIndexOf('/'));
        let filen = path.substring(path.lastIndexOf('/') + 1, path.length);
        // console.log(pathf, '.........................', filen);
        this.file.readAsText(pathf, filen).then((data) => {
          console.log(data);
          let temp = new Chess()
          this.board.setFEN(data)
        })
      })
    })
  }

  enterFEN() {
    this.isFEN = !this.isFEN
  }
  submitFEN() {
    console.log(this.publicFEN);
    if (this.publicFEN !== '') {
      this.board.setFEN(this.publicFEN)
    }

    this.isFEN = false;

  }
  createAccessLogFileAndWrite(text: string) {
    this.file.checkFile(this.file.dataDirectory, 'example.pgn')
      .then(doesExist => {
        console.log("doesExist : " + doesExist, this.file.dataDirectory, '4444444444444444');
        this.writeToAccessLogFile(text);

        this.fileTransfer.download(this.file.dataDirectory + 'example.pgn', this.file.dataDirectory + 'example.pgn').then((entry) => {
          console.log(this.file.resolveDirectoryUrl(this.file.dataDirectory), '5555555555555555');

          console.log('download complete: ' + entry.toURL());
        }, (error) => {
          // handle error
          console.log(error);

        });
      }).catch(err => {
        return this.file.createFile(this.file.dataDirectory, 'example.pgn', false)
          .then(FileEntry => this.writeToAccessLogFile(text))
          .catch(err => console.log('Couldnt create file'));
      });
  }

  writeToAccessLogFile(text: string) {
    this.file.writeExistingFile(this.file.dataDirectory, 'example.pgn', text)
  }

  playChess() {
    this.isPlaying = !this.isPlaying;
    this.dragndraw = !this.dragndraw;
    let bbb: HTMLElement = document.getElementById('boardchess');
    let bbb1: HTMLElement = document.getElementById('drag');
    console.log(this.isPlaying, '...........................');

    if (this.isPlaying === false) {
      clearInterval();
      //this.renderer.setStyle(bbb, 'pointer-events', 'none')
    } else {
      //this.renderer.setStyle(bbb, 'pointer-events', 'unset')

      ///////////////////////
      // this.future = [];
      // var moves = this.chs.history();
      // var tmp = new Chess();
      // var previous = moves.length;
      // for (var i = 0; i < previous; i++) {
      //   tmp.move(moves[i]);
      //   var previous_fen = tmp.fen();
      //   if (previous_fen !== 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1') {
      //     this.future.push(previous_fen);
      //   }
      // }
      // this.future = this.future.map((item, idx) => this.future[this.future.length - 1 - idx])
      // console.log(this.future);
      // this.board.reset();
      if (this.future.length > 0) {
        var t = setInterval(() => {
          if (this.isPlaying === false) {
            clearInterval(t)
          } else {
            this.board.setFEN(this.future.pop())
            console.log(this.future.length);
            if (this.future.length === 0) {
              clearInterval(t)
              this.isPlaying = false;
            }
          }

        }, 500)

      } else {
        //clearInterval()
      }
      ///////////////////////

    }
  }


  goToLive() {
    // this.router.navigate(['chess-board-details'])
    this.router.navigate(['chess-board-details', this.id, this.chess.pgn_data[0].id])
  }

  openPices() {
    this.isPieceEnabled = !this.isPieceEnabled
  }

  pieceClick(piece) {
    console.log(piece);
    localStorage.setItem('piece_url', piece.url)
    this.pieces.whiteKingUrl = '../../assets/image/piece' + piece.url + 'wK.svg';
    this.pieces.whiteQueenUrl = '../../assets/image/piece' + piece.url + 'wQ.svg'
    this.pieces.whiteKnightUrl = '../../assets/image/piece' + piece.url + 'wN.svg';
    this.pieces.whiteRookUrl = '../../assets/image/piece' + piece.url + 'wR.svg'
    this.pieces.whitePawnUrl = '../../assets/image/piece' + piece.url + 'wP.svg';
    this.pieces.whiteBishopUrl = '../../assets/image/piece' + piece.url + 'wB.svg'

    this.pieces.blackKingUrl = '../../assets/image/piece' + piece.url + 'bK.svg';
    this.pieces.blackQueenUrl = '../../assets/image/piece' + piece.url + 'bQ.svg'
    this.pieces.blackKnightUrl = '../../assets/image/piece' + piece.url + 'bN.svg';
    this.pieces.blackRookUrl = '../../assets/image/piece' + piece.url + 'bR.svg'
    this.pieces.blackPawnUrl = '../../assets/image/piece' + piece.url + 'bP.svg';
    this.pieces.blackBishopUrl = '../../assets/image/piece' + piece.url + 'bB.svg'

    this.isPieceEnabled = false
  }
  enterPGN() {
    this.isPGN = !this.isPGN;
  }
  submitPGN() {
    let tmp = new Chess();
    tmp.load_pgn(this.publicPGN)
    this.board.setFEN(tmp.fen())
  }

}
