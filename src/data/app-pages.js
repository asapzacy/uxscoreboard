import * as Icons from 'assets/icons'

export const APP_PAGES = {
  base: [
    {
      name: 'MLB',
      url: 'mlb',
      sport: 'baseball',
      icon: Icons.BaseballLight
    },
    {
      name: 'NBA',
      url: 'nba',
      sport: 'basketball',
      icon: Icons.BasketballLight
    },
    {
      name: 'NFL',
      url: 'nfl',
      sport: 'football',
      icon: Icons.FootballLight
    },
    {
      name: 'NHL',
      url: 'nhl',
      sport: 'hockey',
      icon: Icons.HockeyLight
    },
    {
      name: 'MLS',
      url: 'mls',
      sport: 'soccer',
      icon: Icons.SoccerLight
    }
  ],
  other: [
    {
      name: 'about',
      url: 'about'
    },
    {
      name: 'source',
      url: 'https://github.com/asapzacy/uxscoreboard',
      isExternal: true
    }
  ]
}
