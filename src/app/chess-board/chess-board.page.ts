import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxChessBoardView } from 'ngx-chess-board';
import { ApiService } from '../api.service';
import { boardPieces } from '../boardimages';
import { UtilService } from '../util.service';



@Component({
  selector: 'app-chess-board',
  templateUrl: './chess-board.page.html',
  styleUrls: ['./chess-board.page.scss'],
})
export class ChessBoardPage implements OnInit {
  @ViewChild('boardford', { static: false }) board: NgxChessBoardView;
  public darkTileColor = '#b88942';
  public lightTileColor = '#FFFFFF';
  public size = 300;
  token: string;
  id: string;
  chess: any = {};
  dargdraw: any = true;
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
  img: any = 'https://cdn1.ichess.net/wp-content/uploads/2017/09/Chess-Pieces-Set-Up.jpg'
  constructor(private router: Router, private api: ApiService, private util: UtilService, private activatedRoute: ActivatedRoute, private renderer: Renderer2) {
    this.token = localStorage.getItem('token');
    this.id = this.activatedRoute.snapshot.paramMap.get('id')
    console.log(this.id, 'this is the id from dashboard');
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

  }

  ngOnInit() {
    // let bbb:HTMLElement = document.getElementById('boardford0');
    // let bbb1:HTMLElement = document.getElementById('drag');
    //console.log(bbb);


    //  this.renderer.setStyle(bbb,'pointer-events','none')
    //   this.renderer.setStyle(bbb,'padding','10px')
    //   this.renderer.setStyle(bbb,'background-color','#b88942')
    //   this.renderer.setStyle(bbb,'border-radius','7px')
    //   this.renderer.setStyle(bbb1,'border','1px solid #f8f8f8')

    this.util.presentLoading();
    this.api.chessBoard(this.id, this.token).subscribe((res: any) => {
      console.log(res);
      this.chess = res;
      this.util.dismissLoading()
      setTimeout(() => {
        this.chess.pgn_data.forEach((element, index) => {
          let bbb = document.getElementById('boardford' + index.toString());
          let bbb1: HTMLElement = document.getElementById('drag');
          console.log(bbb, index);
  
  
  
          //  this.renderer.setStyle(bbb1,'pointer-events','none')
          //   this.renderer.setStyle(bbb,'padding','10px')
          //   this.renderer.setStyle(bbb,'background-color','#b88942')
          //   this.renderer.setStyle(bbb,'border-radius','7px')
          //   this.renderer.setStyle(bbb1,'border','1px solid #f8f8f8')
          let image = localStorage.getItem('chess_image');
          if (image) {
            let img = JSON.parse(image);
            console.log(img);
  
  
  
            // this.renderer.setAttribute(bbb,"class",'bb1');
            this.renderer.setStyle(bbb, 'padding', '10px')
            this.renderer.setStyle(bbb, 'background-color', img.border)
            this.renderer.setStyle(bbb, 'border-radius', '7px')
            this.renderer.setStyle(bbb1, 'border', '1px solid #f8f8f8')
            let parent = bbb.children[0].children[0]
            for (let i = 0; i < 8; i++) {
              for (let j = 0; j < 8; j++) {
                if (i % 2 === j % 2) {
  
  
                  this.renderer.setStyle(parent.children[i].children[j], 'background-image', 'url("' + img.even + '")');
                  this.renderer.setStyle(parent.children[i].children[j], 'background-size', 'contain');
                  this.renderer.setStyle(parent.children[i].children[j], 'z-index', '1000000')
                } else {
                  this.renderer.setStyle(parent.children[i].children[j], 'background-image', 'url("' + img.odd + '")');
                  this.renderer.setStyle(parent.children[i].children[j], 'background-size', 'contain');
                  this.renderer.setStyle(parent.children[i].children[j], 'z-index', '1000000')
                }
  
              }
  
  
            }
  
          } else {
            this.renderer.setStyle(bbb, 'background-color', this.darkTileColor)
          }
  
        });
      },1000)
      
    }, (err: HttpErrorResponse) => {
      console.log(err);

    })
  }
  ngAfterViewInit() {

    if (Object.keys(this.chess).length === 0) {
      console.log(this.chess, '.......................');


    }

  }
  reset() {
    this.board.reset();
  }

  details() {
    if (this.chess.pgn_data.length > 0) {
      this.router.navigate(['chess-board-details', this.id, this.chess.pgn_data[0].id])
    } else {
      this.util.presentAlert("No Data")
    }

    //this.router.navigate(['chess-board-details',13,12])
  }

}
