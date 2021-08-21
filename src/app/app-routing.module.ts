import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'update-profile',
    loadChildren: () => import('./update-profile/update-profile.module').then( m => m.UpdateProfilePageModule)
  },
  {
    path: 'create-tournament/:id',
    loadChildren: () => import('./create-tournament/create-tournament.module').then( m => m.CreateTournamentPageModule)
  },
  {
    path: 'tournament-list',
    loadChildren: () => import('./tournament-list/tournament-list.module').then( m => m.TournamentListPageModule)
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then( m => m.UsersPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./reset-password/reset-password.module').then( m => m.ResetPasswordPageModule)
  },
  {
    path: 'payment',
    loadChildren: () => import('./payment/payment.module').then( m => m.PaymentPageModule)
  },
  {
    path: 'checkout',
    loadChildren: () => import('./checkout/checkout.module').then( m => m.CheckoutPageModule)
  },
  {
    path: 'chess-board/:id',
    loadChildren: () => import('./chess-board/chess-board.module').then( m => m.ChessBoardPageModule)
  },
  {
    path: 'all-tournament',
    loadChildren: () => import('./all-tournament/all-tournament.module').then( m => m.AllTournamentPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'add-player/:id',
    loadChildren: () => import('./add-player/add-player.module').then( m => m.AddPlayerPageModule)
  },
  {
    path: 'add-rounds/:id',
    loadChildren: () => import('./add-rounds/add-rounds.module').then( m => m.AddRoundsPageModule)
  },
  {
    path: 'add-pgn/:id',
    loadChildren: () => import('./add-pgn/add-pgn.module').then( m => m.AddPGNPageModule)
  },
  {
    path: 'chess-board-details/:id/:pgnid',
    loadChildren: () => import('./chess-board-details/chess-board-details.module').then( m => m.ChessBoardDetailsPageModule)
  },
  {
    path: 'tournament-pop',
    loadChildren: () => import('./tournament-pop/tournament-pop.module').then( m => m.TournamentPopPageModule)
  },
  {
    path: 'payment-stripe',
    loadChildren: () => import('./payment-stripe/payment-stripe.module').then( m => m.PaymentStripePageModule)
  },
  {
    path: 'chess-board-analytics/:id/:pgnid',
    loadChildren: () => import('./chess-board-analytics/chess-board-analytics.module').then( m => m.ChessBoardAnalyticsPageModule)
  },
  {
    path: 'tournament-view/:id',
    loadChildren: () => import('./tournament-view/tournament-view.module').then( m => m.TournamentViewPageModule)
  },
  {
    path: 'membership',
    loadChildren: () => import('./membership/membership.module').then( m => m.MembershipPageModule)
  },
  {
    path: 'change-password',
    loadChildren: () => import('./change-password/change-password.module').then( m => m.ChangePasswordPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
