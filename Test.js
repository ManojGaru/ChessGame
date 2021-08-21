
create_tournament = {
    basic: {
        tournament_name: "test",
        tournament_description: 'Test',
        location: 'test',
        type: 'test',
        country: 'test',
        laws_of_chess: 'test',
        start_date: '25/01/21',
        satrt_time: '05:30 AM',
        end_date: '25/01/21',
        end_time: '05:30 AM',
        timezone: 'Test',
        rounds: 3
    },
    players:{
        total_no:2,
        players:[
            {
                first_name: 'Test',
                last_name: "Test",
                gender: 'male',
                reating: '5',
                title: 'Test',
                ranking: '5',
                country_ranking: '5'
            },
            {
                first_name: 'Test',
                last_name: "Test",
                gender: 'male',
                reating: '5',
                title: 'Test',
                ranking: '5',
                country_ranking: '5'
            }
        ]
    }, 
    rounds_opponent:{
        total_no:2,
        round_opponent:[
            {
                player_per_round: 2,
                player1: 'Test',
                player2: 'Test'
            },
            {
                player_per_round: 2,
                player1: 'Test',
                player2: 'Test'
            }
        ]
    } ,
    pgn:{
        total_no:2,
        pgns:[
            {
                round: 'Test',
                game: 'Test',
                dgt_link: 'www.google.com'
            },
            {
                round: 'Test',
                game: 'Test',
                dgt_link: 'www.google.com'
            }
        ]
    } 
}