import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/shared/services/api.service';
import { DataCacheService } from 'src/app/shared/services/data-cache.service';

@Component({
  selector: 'app-all-anime',
  templateUrl: './all-anime.component.html',
  styleUrls: ['./all-anime.component.scss'],
})
export class AllAnimeComponent implements OnInit {
  index: number = 0;
  popularAnimes!: any[];
  recentlyRelesedAnimes!: any[];
  currentPage = 1;
  // popularAnimes = [
  //   {
  //     adult: false,
  //     backdrop_path: '/9DrORnlwnjt5SeJKcuE5sqOoIdV.jpg',
  //     genre_ids: [16, 10759, 10765],
  //     id: 207468,
  //     origin_country: ['JP'],
  //     original_language: 'ja',
  //     original_name: '怪獣８号',
  //     overview:
  //       "In a world plagued by creatures known as Kaiju, Kafka Hibino aspired to enlist in The Defense Force. He makes a promise to enlist with his childhood friend, Mina Ashiro. Soon, life takes them in separate ways. While employed cleaning up after Kaiju battles, Kafka meets Reno Ichikawa. Reno's determination to join The Defense Force reawakens Kafka's promise to join Mina and protect humanity.",
  //     popularity: 849.679,
  //     poster_path: '/z1izrKMD7CG4ublUQUAY9ZcfUlp.jpg',
  //     first_air_date: '2024-04-13',
  //     name: 'Kaiju No. 8',
  //     vote_average: 8.4,
  //     vote_count: 81,
  //   },
  //   {
  //     adult: false,
  //     backdrop_path: '/j9fRIimor0AMFJR9kjZubXcABzZ.jpg',
  //     genre_ids: [16, 10759, 10765],
  //     id: 94664,
  //     origin_country: ['JP'],
  //     original_language: 'ja',
  //     original_name: '無職転生 ～異世界行ったら本気だす～',
  //     overview:
  //       'A 34-year-old hikikomori is kicked out of his home by his family after the death of his parents. After his eviction, he saves a group of teenagers from being killed by a speeding truck, but loses his life in the process. When he comes to, he realizes he has been reborn as Rudeus Greyrat, in a world of swords and sorcery.',
  //     popularity: 1166.46,
  //     poster_path: '/z4rvmhoqQiGMnwuBHY1QcH3OqUo.jpg',
  //     first_air_date: '2021-01-11',
  //     name: 'Mushoku Tensei: Jobless Reincarnation',
  //     vote_average: 8.523,
  //     vote_count: 966,
  //   },
  //   {
  //     adult: false,
  //     backdrop_path: '/bxTRLwRy5E3d97loCxXp136vDDu.jpg',
  //     genre_ids: [16, 10759, 10765],
  //     id: 97617,
  //     origin_country: ['JP'],
  //     original_language: 'ja',
  //     original_name:
  //       '魔王学院の不適合者 ～史上最強の魔王の始祖、転生して子孫たちの学校へ通う～',
  //     overview:
  //       'Anos Voldigord was a tyrannical Demon King that eradicated humans, spirits, and even the gods, but became bored of eternal warfare and reincarnated with dreams of a peaceful world. However, what awaited him in reincarnation after 2000 years were descendants who became too weak after being accustomed to peace, and all sorts of magic that deteriorated to the extreme. Anos enters Demon King Academy that gathers and educates those who are viewed as the reincarnation of the Demon King, but the academy could not see through his true powers and ends up branding him as a misfit.',
  //     popularity: 585.01,
  //     poster_path: '/6VjUfaGkt3DJPLlNmnm1ALEhSfv.jpg',
  //     first_air_date: '2020-07-04',
  //     name: 'The Misfit of Demon King Academy',
  //     vote_average: 8.53,
  //     vote_count: 723,
  //   },
  //   {
  //     adult: false,
  //     backdrop_path: '/g1DgfhkneXTRzJH38POYm4Es3gQ.jpg',
  //     genre_ids: [16, 35, 10759, 10765],
  //     id: 154524,
  //     origin_country: ['JP'],
  //     original_language: 'ja',
  //     original_name: 'うる星やつら',
  //     overview:
  //       'Tokyo. Tomobiki Town. Lum, the gorgeous daughter of an invading race of Oni Aliens is smitten with High School student Ataru Moroboshi. A dedicated womanizer, Ataru is unfazed by Lum’s fierce electric shock attacks and continues his daily hunt for pretty girls. With a host of other unique characters, including classmate Shinobu, elegant shrine maiden Sakura, Lum’s best friend’s Oyuki, Benten and Ran, Buddhist Monk Cherry, Ten, the little brat, heir to a wealthy family Shutaro Mendo and the secretly female beauty Ryunosuke… A classic slapstick love comedy where anything goes!',
  //     popularity: 750.303,
  //     poster_path: '/vzOSTRN7ThklByHIMKHRYDO2cfV.jpg',
  //     first_air_date: '2022-10-14',
  //     name: 'Urusei Yatsura',
  //     vote_average: 6.776,
  //     vote_count: 29,
  //   },
  //   {
  //     adult: false,
  //     backdrop_path: '/9wLRrDBRGtCD68BRF7BsD0RHHQ3.jpg',
  //     genre_ids: [10759, 16, 35, 10765, 10762, 10751],
  //     id: 65733,
  //     origin_country: ['JP'],
  //     original_language: 'ja',
  //     original_name: 'ドラえもん',
  //     overview:
  //       "Robotic cat Doraemon is sent back in time from the 22nd century to protect 10-year-old Noby, a lazy and uncoordinated boy who is destined to have a tragic future. Doraemon can create secret gadgets from a pocket on his stomach, but they usually cause more bad than good because of Noby's propensity to misuse them.",
  //     popularity: 400.214,
  //     poster_path: '/9ZN1P32SHviL3SV51qLivxycvcx.jpg',
  //     first_air_date: '2005-04-22',
  //     name: 'Doraemon',
  //     vote_average: 7.8,
  //     vote_count: 113,
  //   },
  //   {
  //     adult: false,
  //     backdrop_path: '/kiueyTJZ8CWmJ3HdnnEwnEjzeBc.jpg',
  //     genre_ids: [16, 35, 10751],
  //     id: 76075,
  //     origin_country: ['JP'],
  //     original_language: 'ja',
  //     original_name: 'ゆるキャン△',
  //     overview:
  //       "Nadeshiko, a high school student who had moved from Shizuoka to Yamanashi, decides to see the famous, 1000 yen-bill-featured Mount Fuji. Even though she manages to bike all the way to Motosu, she's forced to turn back because of worsening weather. Unable to set her eyes on her goal, she faints partway to her destination. When she wakes up, it's night, in a place she's never been before, with no way of knowing how to get home. Nadeshiko is saved when she encounters Rin, a girl who is out camping by herself. This outdoorsy girls story begins with this first encounter between Nadeshiko and Rin.",
  //     popularity: 676.128,
  //     poster_path: '/fsTqmos9zikrNJfP0uwFsmuZOh.jpg',
  //     first_air_date: '2018-01-04',
  //     name: 'Laid-Back Camp',
  //     vote_average: 8.177,
  //     vote_count: 83,
  //   },
  //   {
  //     adult: false,
  //     backdrop_path: '/lpLZuBJuGDGSzLDVvIDKkdOpLuD.jpg',
  //     genre_ids: [10759, 16, 10765],
  //     id: 60833,
  //     origin_country: ['JP'],
  //     original_language: 'ja',
  //     original_name: '魔法科高校の劣等生',
  //     overview:
  //       'In a world where magic is not a fairy tale but has existed for one hundred years siblings Tatsuya and Miyuki Shiba prepare to begin their studies at the elite Private Magic University Affiliated High School (Magic High School for short). Entering on different levels of the academic spectrum the two turn the once peaceful campus into a chaotic one.',
  //     popularity: 436.01,
  //     poster_path: '/4mJpMjdghHo4LfvmP1q1mubkEvl.jpg',
  //     first_air_date: '2014-04-06',
  //     name: 'The Irregular at Magic High School',
  //     vote_average: 7.878,
  //     vote_count: 254,
  //   },
  //   {
  //     adult: false,
  //     backdrop_path: '/xC5GyeIzLsSRizJE5LedGShNgBa.jpg',
  //     genre_ids: [16, 10759, 10765, 35],
  //     id: 207784,
  //     origin_country: ['JP'],
  //     original_language: 'ja',
  //     original_name: 'ダンジョン飯',
  //     overview:
  //       'Dungeons, dragons... and delicious monster stew!? Adventurers foray into a cursed buried kingdom to save their friend, cooking up a storm along the way.',
  //     popularity: 431.022,
  //     poster_path: '/9t3DYdGxK3i4WRzKvIZwJd4kBnr.jpg',
  //     first_air_date: '2024-01-04',
  //     name: 'Delicious in Dungeon',
  //     vote_average: 8.667,
  //     vote_count: 60,
  //   },
  //   {
  //     adult: false,
  //     backdrop_path: '/rvZJxD36tKoglL8fXoMMWKGQfM.jpg',
  //     genre_ids: [10759, 16, 35, 10765],
  //     id: 65844,
  //     origin_country: ['JP'],
  //     original_language: 'ja',
  //     original_name: 'この素晴らしい世界に祝福を！',
  //     overview:
  //       'After a traffic accident, Kazuma Sato’s  disappointingly brief life was supposed to be over, but he wakes up to  see a beautiful girl before him. She claims to be a goddess, Aqua, and  asks if he would like to go to another world and bring only one thing  with him. Kazuma decides to bring the goddess herself, and they are  transported to a fantasy world filled with adventure, ruled by a demon  king. Now Kazuma only wants to live in peace, but Aqua wants to solve  many of this world’s problems, and the demon king will only turn a blind  eye for so long…',
  //     popularity: 414.324,
  //     poster_path: '/oRaOeQlwktbGSd2T31FYAcgHZlh.jpg',
  //     first_air_date: '2016-01-14',
  //     name: "KONOSUBA - God's blessing on this wonderful world!",
  //     vote_average: 8.582,
  //     vote_count: 1201,
  //   },
  //   {
  //     adult: false,
  //     backdrop_path: '/5qUq8oCHnMz4IodB3WRJ3rmAl83.jpg',
  //     genre_ids: [16, 35, 18],
  //     id: 77240,
  //     origin_country: ['JP'],
  //     original_language: 'ja',
  //     original_name: 'キャプテン翼',
  //     overview:
  //       'The passionate story of an elementary school student whose thoughts and dreams revolve almost entirely around the love of soccer. 11-year-old Tsubasa Oozora started playing football at a very young age, and while it was mostly just a recreational sport for his friends, for him, it developed into something of an obsession.  In order to pursue his dream to the best of his elementary school abilities, Tsubasa moves with his mother to Nankatsu city, which is well-known for its excellent elementary school soccer teams. But although he was easily the best in his old town, Nankatsu has a lot more competition, and he will need all of his skill and talent in order to stand out from this new crowd.',
  //     popularity: 397.652,
  //     poster_path: '/zHgc9nTXiP77qoy14BO7WUFTwkp.jpg',
  //     first_air_date: '2018-04-03',
  //     name: 'Captain Tsubasa',
  //     vote_average: 8.2,
  //     vote_count: 626,
  //   },
  //   {
  //     adult: false,
  //     backdrop_path: '/d0axpGojOqDag5lDa0eNSEtw11l.jpg',
  //     genre_ids: [16, 10759, 10762, 35, 10765],
  //     id: 220150,
  //     origin_country: ['JP'],
  //     original_language: 'ja',
  //     original_name: 'ポケットモンスター',
  //     overview:
  //       'Follow Liko and Roy as they unravel the mysteries that surround them and encounter Friede, Captain Pikachu, Amethio, and others during their exciting adventures!',
  //     popularity: 380.778,
  //     poster_path: '/amemXW39lMbNBJFRMJ5W7q9mLP2.jpg',
  //     first_air_date: '2023-04-14',
  //     name: 'Pokémon Horizons: The Series',
  //     vote_average: 8.9,
  //     vote_count: 31,
  //   },
  //   {
  //     adult: false,
  //     backdrop_path: '/lyam6zw2aNwSM6h6sn0wTLgygj6.jpg',
  //     genre_ids: [16, 10765, 35, 10759],
  //     id: 46004,
  //     origin_country: ['JP'],
  //     original_language: 'ja',
  //     original_name: 'デート・ア・ライブ',
  //     overview:
  //       'Thirty years ago a strange phenomenon called a "spacequake" devastated the center of Eurasia, claiming the lives of at least 150 million people. Since then, smaller spacequakes plague the world on an irregular basis. Shido Itsuka, a seemingly ordinary high schooler comes across a mysterious girl at the ground zero of a spacequake and learns she is one of the "Spirits" who are the real cause of the spacequakes that occur when they manifest themselves in the world. He is recruited to make use of his mysterious ability to seal the Spirits\' powers thus stopping them from being a threat to mankind. However, there is a catch: to seal a Spirit\'s power, he must make her fall in love with him and kiss him.',
  //     popularity: 447.103,
  //     poster_path: '/kD1Gu7dcELnUUnm3eMxZuG6jKtA.jpg',
  //     first_air_date: '2013-04-06',
  //     name: 'Date a Live',
  //     vote_average: 8.5,
  //     vote_count: 420,
  //   },
  //   {
  //     adult: false,
  //     backdrop_path: '/cH39aJg9VlEaYo6yY37Iah8RAaz.jpg',
  //     genre_ids: [10759, 16, 10765],
  //     id: 65930,
  //     origin_country: ['JP'],
  //     original_language: 'ja',
  //     original_name: '僕のヒーローアカデミア',
  //     overview:
  //       'A superhero-admiring boy without any powers enrolls in a prestigious hero academy and learns what it really means to be a hero.',
  //     popularity: 312.099,
  //     poster_path: '/phuYuzqWW9ru8EA3HVjE9W2Rr3M.jpg',
  //     first_air_date: '2016-04-03',
  //     name: 'My Hero Academia',
  //     vote_average: 8.651,
  //     vote_count: 4703,
  //   },
  //   {
  //     adult: false,
  //     backdrop_path: '/xzjZDyqUobuJtkBljhgLH4Fdnye.jpg',
  //     genre_ids: [10759, 16, 10765, 35],
  //     id: 82684,
  //     origin_country: ['JP'],
  //     original_language: 'ja',
  //     original_name: '転生したらスライムだった件',
  //     overview:
  //       '37-year-old corporate worker Mikami Satoru is stabbed by a random killer, and is reborn to an alternate world. But he turns out to be reborn a slime! Thrown into this new world with the name Rimuru Tempest, he begins his quest to create a world that’s welcoming to all races. Broken free from ordinary, stale past life, his fresh adventure in a fantasy world as a slime monster with unique abilities begins.',
  //     popularity: 342.131,
  //     poster_path: '/jQb1ztdko9qc4aCdnMXShcIHXRG.jpg',
  //     first_air_date: '2018-10-02',
  //     name: 'That Time I Got Reincarnated as a Slime',
  //     vote_average: 8.5,
  //     vote_count: 705,
  //   },
  //   {
  //     adult: false,
  //     backdrop_path: '/5U0dYTkHXPhoExNnEm5iKrpDqtr.jpg',
  //     genre_ids: [16, 35, 18, 9648, 10765],
  //     id: 50712,
  //     origin_country: ['JP'],
  //     original_language: 'ja',
  //     original_name: '黒執事',
  //     overview:
  //       "In Victorian London, 12-year-old business magnate Ciel Phantomhive thwarts dangers to the queen as he's watched over by his demon butler, Sebastian.",
  //     popularity: 350.02,
  //     poster_path: '/jHAMBPUPBCav8FCaR0yldnQpCb4.jpg',
  //     first_air_date: '2008-10-02',
  //     name: 'Black Butler',
  //     vote_average: 7.647,
  //     vote_count: 170,
  //   },
  //   {
  //     adult: false,
  //     backdrop_path: '/2rmK7mnchw9Xr3XdiTFSxTTLXqv.jpg',
  //     genre_ids: [10759, 35, 16],
  //     id: 37854,
  //     origin_country: ['JP'],
  //     original_language: 'ja',
  //     original_name: 'ワンピース',
  //     overview:
  //       'Years ago, the fearsome Pirate King, Gol D. Roger was executed leaving a huge pile of treasure and the famous "One Piece" behind. Whoever claims the "One Piece" will be named the new King of the Pirates.\n\nMonkey D. Luffy, a boy who consumed a "Devil Fruit," decides to follow in the footsteps of his idol, the pirate Shanks, and find the One Piece. It helps, of course, that his body has the properties of rubber and that he\'s surrounded by a bevy of skilled fighters and thieves to help him along the way.\n\nLuffy will do anything to get the One Piece and become King of the Pirates!',
  //     popularity: 318.352,
  //     poster_path: '/cMD9Ygz11zjJzAovURpO75Qg7rT.jpg',
  //     first_air_date: '1999-10-20',
  //     name: 'One Piece',
  //     vote_average: 8.729,
  //     vote_count: 4431,
  //   },
  //   {
  //     adult: false,
  //     backdrop_path: '/yLrgx1AbgmSDQNp5YBZxc5Tix7B.jpg',
  //     genre_ids: [16, 10759],
  //     id: 223500,
  //     origin_country: ['JP'],
  //     original_language: 'ja',
  //     original_name: 'WIND BREAKER',
  //     overview:
  //       "Haruka Sakura wants nothing to do with weaklings—he's only interested in the strongest of the strong. He's just started at Furin High School, a school of degenerates known only for their brawling strength—strength they use to protect their town from anyone who wishes it ill. But Haruka's not interested in being a hero or being part of any sort of team—he just wants to fight his way to the top!",
  //     popularity: 315.167,
  //     poster_path: '/3kTFL3PAeTyS8gGZAh0iYG6NNjt.jpg',
  //     first_air_date: '2024-04-05',
  //     name: 'WIND BREAKER',
  //     vote_average: 8.1,
  //     vote_count: 20,
  //   },
  //   {
  //     adult: false,
  //     backdrop_path: '/1Rr1h1wRhaBXUqbgha3pJPi52tf.jpg',
  //     genre_ids: [16, 18],
  //     id: 62564,
  //     origin_country: ['JP'],
  //     original_language: 'ja',
  //     original_name: '響け！ユーフォニアム',
  //     overview:
  //       "After swearing off music due to an incident at the middle school regional brass band competition, euphonist Kumiko Oumae enters high school hoping for a fresh start. As fate would have it, she ends up being surrounded by people with an interest in the high school brass band. Kumiko finds the motivation she needs to make music once more with the help of her bandmates, some of whom are new like novice tubist Hazuki Katou; veteran contrabassist Sapphire Kawashima; and band vice president and fellow euphonist Asuka Tanaka. Others are old friends, like Kumiko's childhood friend and hornist-turned-trombonist Shuuichi Tsukamoto, and trumpeter and bandmate from middle school, Reina Kousaka.\n\nHowever, in the band itself, chaos reigns supreme. Despite their intention to qualify for the national band competition, as they currently are, just competing in the local festival will be a challenge—unless the new band advisor Noboru Taki does something about it.",
  //     popularity: 313.629,
  //     poster_path: '/l0hKrx6PjQRrHiMzK2Fanen2xbL.jpg',
  //     first_air_date: '2015-04-08',
  //     name: 'Sound! Euphonium',
  //     vote_average: 7.896,
  //     vote_count: 72,
  //   },
  //   {
  //     adult: false,
  //     backdrop_path: '/petHMm8TmcYiBy1JOTCncBcNk83.jpg',
  //     genre_ids: [16, 10765, 10759],
  //     id: 237233,
  //     origin_country: ['JP'],
  //     original_language: 'ja',
  //     original_name: 'Lv2からチートだった元勇者候補のまったり異世界ライフ',
  //     overview:
  //       'The Magical Kingdom of Klyrode summons hundreds of heroes from other worlds every year to fight in their war against the Dark One and his army of powerful demons. Banaza is one of those heroes, summoned from the Royal Capital Paluma, but something’s not right—Banaza is only an average merchant. He has no magic, no fighting ability, and his stats are abysmal. Worse, a mishap leaves him unable to return home! Rejected as a hero and stranded in another world, abandoned to the far reaches of the kingdom by a cruel king who just wants him gone, Banaza’s fate looks pretty bleak. But what will happen once the failed hero candidate finds himself with super cheat powers once he hits level two?',
  //     popularity: 247.714,
  //     poster_path: '/3eBu6hYDRe72ZPUfLbhaHfF7EM9.jpg',
  //     first_air_date: '2024-04-08',
  //     name: "Chillin' in Another World with Level 2 Super Cheat Powers",
  //     vote_average: 8.125,
  //     vote_count: 9,
  //   },
  //   {
  //     adult: false,
  //     backdrop_path: '/xjqXrLjMV3SOEdSVaLQghRL6zdk.jpg',
  //     genre_ids: [10765, 16, 10759, 18, 35],
  //     id: 196251,
  //     origin_country: ['JP'],
  //     original_language: 'ja',
  //     original_name: 'シャドウバースF（フレイム）',
  //     overview:
  //       'Shadowverse Flame features a new protagonist Light Tenryu and its story is set in Shadovar College, a facility that trains professional players of the Shadowverse game. Tenryu Light, a transfer student, decides to join "Seventh Flame," one of the seven Shadovar clubs. However, Seventh Flame is on the verge of closure due to a lack of members! In order to avoid the club\'s demise, Light decides to look for new members. But what awaits him are powerful rivals who control a wide variety of cards...',
  //     popularity: 196.631,
  //     poster_path: '/5AsCtDXCdfwl4s9ZjLvqyLYXXpP.jpg',
  //     first_air_date: '2022-04-02',
  //     name: 'Shadowverse Flame',
  //     vote_average: 6.7,
  //     vote_count: 10,
  //   },
  // ];
  // recentlyRelesedAnimes = [
  //   {
  //     adult: false,
  //     backdrop_path: '/bFxcYS5YqksYjb4ANBDxZi7wdS4.jpg',
  //     genre_ids: [16, 35],
  //     id: 248866,
  //     origin_country: ['JP'],
  //     original_language: 'ja',
  //     original_name: 'しかのこのこのここしたんたん',
  //     overview:
  //       'No one knows Torako used to be a delinquent. All of her classmates only know her as the perfect student. But everything changes when Nokotan, a transfer student with antlers, enters her life. Antlers aren’t the only thing strange about Nokotan. Her deer nose can sniff out Torako’s secret past! Whether it’s at school or the zoo, chaos follows this doe-eyed girl’s every step. Torako has so many questions! Is Nokotan a deer, a girl, or something in-between?',
  //     popularity: 13.702,
  //     poster_path: '/oZ8i3ih2jWfuVu4kn7YNRbGhSnC.jpg',
  //     first_air_date: '2024-07-07',
  //     name: 'My Deer Friend Nokotan',
  //     vote_average: 0,
  //     vote_count: 0,
  //   },
  //   {
  //     adult: false,
  //     backdrop_path: null,
  //     genre_ids: [16, 10759, 10765],
  //     id: 244620,
  //     origin_country: ['JP'],
  //     original_language: 'ja',
  //     original_name: 'モブから始まる探索英雄譚',
  //     overview:
  //       'Meet Kaito Takagi, your typical high schooler with a low profile. He spends his days exploring dungeons in Japan, hunting slimes for some extra cash. On the side, he quietly admires his childhood friend, the popular girl in class. One day, a rare golden slime shows up, and after Kaito defeats it, he finds a super valuable item—a card that can summon mythical beings! He decides to use it and summons a stunning warrior maiden. Now, Kaito has a chance to rise above his ordinary explorer life. Get ready for a modern fantasy story filled with battles!',
  //     popularity: 17.92,
  //     poster_path: '/eNHKLmp9qY79QG0JXiKknO4Hzbv.jpg',
  //     first_air_date: '2024-07-06',
  //     name: 'The Story of an Exploration Hero Who Has Worked His Way Up from Common People',
  //     vote_average: 0,
  //     vote_count: 0,
  //   },
  //   {
  //     adult: false,
  //     backdrop_path: null,
  //     genre_ids: [16],
  //     id: 222925,
  //     origin_country: ['JP'],
  //     original_language: 'ja',
  //     original_name: 'この世界は不完全すぎる',
  //     overview:
  //       "Despite its location in a remote region south of the continent of Felnarc, the island of Clayborne is made up of five small countries crowded together and in constant conflict. In the most remote reaches of the smallest and most peaceful country on the island, the Kingdom of Bayle, is the small village where a girl named Nikola lives a humble life. One day, while she's out gathering firewood as she does every day, a massive dragon—a creature that's supposed to only live deep in the mountains—appears in front of her. Just as it's about to attack the village, a man named Haga rushes to the scene. Haga is a member of the King's Seekers, a top secret investigation team. Nikola has never once felt bored with her peaceful life, even when every single day is practically the same, but after meeting Haga, she's so intrigued by Haga and his travels that she decides to step out into the world herself... and then the learns the true nature of her world.",
  //     popularity: 11.049,
  //     poster_path: '/xdKKtkx7MmzyGUroXzKGNc3t0dx.jpg',
  //     first_air_date: '2024-07-06',
  //     name: 'Quality Assurance in Another World',
  //     vote_average: 0,
  //     vote_count: 0,
  //   },
  //   {
  //     adult: false,
  //     backdrop_path: null,
  //     genre_ids: [16],
  //     id: 239761,
  //     origin_country: ['JP'],
  //     original_language: 'ja',
  //     original_name: '先輩はおとこのこ',
  //     overview:
  //       "Saki, a high school student, confesses her feelings to Makoto. Taken aback, Makoto reveals his secret, but the sudden discovery doesn't seem to bother Saki who is already head over heels for him. After being rejected, Saki asks Ryuji, Makoto's childhood friend, for some advice on how to win his heart. A love triangle unfolds when Ryuji realizes that he might also have some feelings for his old friend.",
  //     popularity: 1.46,
  //     poster_path: '/jF8EiosyxAeAJEcQa4DxMW4gsio.jpg',
  //     first_air_date: '2024-07-05',
  //     name: 'Senpai Is an Otokonoko',
  //     vote_average: 0,
  //     vote_count: 0,
  //   },
  //   {
  //     adult: false,
  //     backdrop_path: '/7QOkCbL8WMTK3qV1NfmfHGeDpYq.jpg',
  //     genre_ids: [16, 35],
  //     id: 241628,
  //     origin_country: ['JP'],
  //     original_language: 'ja',
  //     original_name: 'ラーメン赤猫',
  //     overview:
  //       "Meet Tamako, who's found her way into an interview at a ramen shop run solely by cats. When the feline manager asks if she likes cats, Tamako admits that she's actually more of a dog person...only to be hired on the spot! But her job description isn't quite what she expects — rather than serving ramen, she's now a dedicated cat caretaker...?!",
  //     popularity: 30.973,
  //     poster_path: '/zCEWPkobGh1mDUzq4vyqLbvhH1v.jpg',
  //     first_air_date: '2024-07-04',
  //     name: 'Red Cat Ramen',
  //     vote_average: 0,
  //     vote_count: 0,
  //   },
  //   {
  //     adult: false,
  //     backdrop_path: '/bG48yR8UzifLLeYdmNj8kdF9T5B.jpg',
  //     genre_ids: [16],
  //     id: 216074,
  //     origin_country: ['JP'],
  //     original_language: 'ja',
  //     original_name: '2.5次元の誘惑',
  //     overview: '',
  //     popularity: 16.748,
  //     poster_path: '/mScRmknR5OTOxaRdbzNxnJkG4Zo.jpg',
  //     first_air_date: '2024-07-04',
  //     name: '2.5 Dimensional Seduction',
  //     vote_average: 0,
  //     vote_count: 0,
  //   },
  //   {
  //     adult: false,
  //     backdrop_path: '/cQGq1oRSORK1xHnAvli4qXOBOTJ.jpg',
  //     genre_ids: [16, 10765],
  //     id: 250596,
  //     origin_country: ['JP'],
  //     original_language: 'ja',
  //     original_name: '僕の妻は感情がない',
  //     overview:
  //       'Takuma is a single guy who does nothing but go to work and come home. Too tired to do chores, he decides to get a robot to cook and keep house. "Mina-chan" is such a good housekeeper, Takuma jokes that she should become his wife. Mina takes Takuma\'s joke seriously, and slowly the two start doing more things together, like having a picnic outside. As time goes by, Takuma starts to fall for Mina, but can a human and a robot ever have an equal, loving relationship?',
  //     popularity: 19.54,
  //     poster_path: '/aCmKOn2yd0cLRvyAFtjbkOLPZz6.jpg',
  //     first_air_date: '2024-07-02',
  //     name: 'My Wife Has No Emotion',
  //     vote_average: 0,
  //     vote_count: 0,
  //   },
  //   {
  //     adult: false,
  //     backdrop_path: '/pzixcpapxZMQTkSGYtfYtcoy0EU.jpg',
  //     genre_ids: [16, 10765],
  //     id: 133154,
  //     origin_country: ['JP'],
  //     original_language: 'ja',
  //     original_name: '鬼人幻燈抄',
  //     overview:
  //       'In the Edo period, there was a shrine maiden called "Itsukihime" in the mountain village of Kadono. Jinta, a young man who acts as the shrine maiden\'s guardian despite being a stranger, encounters a mysterious demon who speaks of the far future in the forest where he went to defeat it. From Edo to the Heisei era, this huge Japanese fantasy series follows a demon man who travels through time while continuously questioning the meaning of wielding a sword.',
  //     popularity: 1.96,
  //     poster_path: '/blzNjWe4UBqA6lZl7rFyBsbbpFh.jpg',
  //     first_air_date: '2024-06-26',
  //     name: 'Sword of the Demon Hunter: Kijin Gentoushou',
  //     vote_average: 0,
  //     vote_count: 0,
  //   },
  //   {
  //     adult: false,
  //     backdrop_path: '/bNzH6RMrK9L7kOyX9ou9CeHieDU.jpg',
  //     genre_ids: [16, 18],
  //     id: 241138,
  //     origin_country: ['JP'],
  //     original_language: 'ja',
  //     original_name: 'ライジングインパクト',
  //     overview:
  //       'Gawain Nanaumi is a third-grader with an incredible love for baseball and making the ball really fly. In a chance encounter with a female professional golfer, Kiria Nishino, he learns that golf will allow him to hit a ball further than any other sport.',
  //     popularity: 25.166,
  //     poster_path: '/lzOFbNqsGTEjXOMvgQe5oiWgXkz.jpg',
  //     first_air_date: '2024-06-22',
  //     name: 'Rising Impact',
  //     vote_average: 0,
  //     vote_count: 0,
  //   },
  //   {
  //     adult: false,
  //     backdrop_path: '/hP8mjaysbt2YIf7l7Ss43h9hzEW.jpg',
  //     genre_ids: [10759, 16],
  //     id: 252425,
  //     origin_country: ['JP'],
  //     original_language: 'ja',
  //     original_name: '餓狼伝: The Way of the Lone Wolf',
  //     overview:
  //       'On the run from a past crime, Juzo Fujimaki is blackmailed into joining an illicit tournament and has to face top martial artists in deadly match-ups.',
  //     popularity: 37.95,
  //     poster_path: '/nTaoyIjWMkPvtKjBaqacmUE3iIW.jpg',
  //     first_air_date: '2024-05-23',
  //     name: 'Garouden: The Way of the Lone Wolf',
  //     vote_average: 0,
  //     vote_count: 0,
  //   },
  //   {
  //     adult: false,
  //     backdrop_path: '/lBjb5NJ7gqV9d8es5JS2D4NQq4o.jpg',
  //     genre_ids: [16, 10759, 18, 10765],
  //     id: 236385,
  //     origin_country: ['JP'],
  //     original_language: 'ja',
  //     original_name: 'T・Pぼん',
  //     overview:
  //       'After Bon accidentally intervenes in a Time Patrol case, he must join Agent Ream in saving innocent lives from the past — while watching history unfold.',
  //     popularity: 178.39,
  //     poster_path: '/13HE9ZZorQ3KLQrFW2KOH0dZLlW.jpg',
  //     first_air_date: '2024-05-02',
  //     name: 'T・P BON',
  //     vote_average: 7.375,
  //     vote_count: 8,
  //   },
  //   {
  //     adult: false,
  //     backdrop_path: '/nVnPoHsR7fo8qlA9fYUsrj701p.jpg',
  //     genre_ids: [16, 10765, 18, 9648],
  //     id: 249812,
  //     origin_country: ['JP'],
  //     original_language: 'ja',
  //     original_name: 'グリム組曲',
  //     overview:
  //       'Inspired by the classic Brothers Grimm stories, this anthology features six fairy tales with a dark twist, exposing the shadowy side of human desire.',
  //     popularity: 90.178,
  //     poster_path: '/vUe5MtWND6WPdIh3fF7Xdx8coBt.jpg',
  //     first_air_date: '2024-04-17',
  //     name: 'The Grimm Variations',
  //     vote_average: 7.5,
  //     vote_count: 16,
  //   },
  //   {
  //     adult: false,
  //     backdrop_path: '/uJ19Y5TroCyYkxjnEVV0xFniUgJ.jpg',
  //     genre_ids: [16, 10759],
  //     id: 239161,
  //     origin_country: ['JP'],
  //     original_language: 'ja',
  //     original_name: 'THE NEW GATE',
  //     overview:
  //       "THE NEW GATE―an online game transformed into a life-and-death struggle for its players. Thanks to the valiant efforts of Shin, the most powerful of them all, an end to the game and freedom for everyone seemed within reach. But just moments after Shin defeats the game's final boss, he finds himself bathed in an unknown light and transported some 500 years into the future of the in-game world. Thrown from a simple game gone wrong into a strange new land, one young swordsman of unrivaled strength is about to embark on a legendary journey!",
  //     popularity: 173.058,
  //     poster_path: '/c1JCYZ6anQCKHxSgBPCtUdNnWoB.jpg',
  //     first_air_date: '2024-04-14',
  //     name: 'THE NEW GATE',
  //     vote_average: 7.5,
  //     vote_count: 4,
  //   },
  //   {
  //     adult: false,
  //     backdrop_path: '/zrqnyKPzKhGHRw9GB6F6zL9R1v5.jpg',
  //     genre_ids: [16, 35, 18],
  //     id: 218291,
  //     origin_country: ['JP'],
  //     original_language: 'ja',
  //     original_name: 'ささやくように恋を唄う',
  //     overview:
  //       'Bubbly, energetic first-year high school student Himari falls head over heels for her senpai, Yori, after hearing her band perform on the first day of school. Himari tells Yori she just loves her, and, to Himari\'s surprise, Yori says she loves Himari back! But when Himari realizes that she and her senpai are feeling two different kinds of love, she begins to ask herself what "love" really means.',
  //     popularity: 116.029,
  //     poster_path: '/xWStcaXFVsu7iyJovp6spxZplWG.jpg',
  //     first_air_date: '2024-04-14',
  //     name: 'Whisper Me a Love Song',
  //     vote_average: 7,
  //     vote_count: 2,
  //   },
  //   {
  //     adult: false,
  //     backdrop_path: '/9DrORnlwnjt5SeJKcuE5sqOoIdV.jpg',
  //     genre_ids: [16, 10759, 10765],
  //     id: 207468,
  //     origin_country: ['JP'],
  //     original_language: 'ja',
  //     original_name: '怪獣８号',
  //     overview:
  //       "In a world plagued by creatures known as Kaiju, Kafka Hibino aspired to enlist in The Defense Force. He makes a promise to enlist with his childhood friend, Mina Ashiro. Soon, life takes them in separate ways. While employed cleaning up after Kaiju battles, Kafka meets Reno Ichikawa. Reno's determination to join The Defense Force reawakens Kafka's promise to join Mina and protect humanity.",
  //     popularity: 849.679,
  //     poster_path: '/z1izrKMD7CG4ublUQUAY9ZcfUlp.jpg',
  //     first_air_date: '2024-04-13',
  //     name: 'Kaiju No. 8',
  //     vote_average: 8.4,
  //     vote_count: 81,
  //   },
  //   {
  //     adult: false,
  //     backdrop_path: '/5cVTc55soLT8SuJBmTS0SZhhBkQ.jpg',
  //     genre_ids: [16, 10759],
  //     id: 246029,
  //     origin_country: ['JP'],
  //     original_language: 'ja',
  //     original_name: '喧嘩独学',
  //     overview:
  //       "Scrawny high school student Hobin Yu is probably the last guy you'd expect to star in a NewTube channel that revolves around fighting. But after following some advice from a mysterious NewTube channel, Hobin is soon knocking out guys stronger than him and raking in more money than he could have ever dreamed of. Can Hobin keep this up, or will he eventually meet his match?",
  //     popularity: 151.632,
  //     poster_path: '/1kZBsmNYgjRxFPBfrFxkQGwS7xX.jpg',
  //     first_air_date: '2024-04-11',
  //     name: 'Viral Hit',
  //     vote_average: 7.333,
  //     vote_count: 3,
  //   },
  //   {
  //     adult: false,
  //     backdrop_path: '/oZywpK8VXRCOltaZZOFCZv6d691.jpg',
  //     genre_ids: [16, 18, 35],
  //     id: 231873,
  //     origin_country: ['JP'],
  //     original_language: 'ja',
  //     original_name: '忘却バッテリー',
  //     overview:
  //       'Star pitcher Haruka Kiyomine and skilled catcher Kei Kaname were an unstoppable duo—until Kei was hit with a curveball: amnesia. Now they have a second chance to play at a no-name high school with a team of past rivals. Can they overcome Kei’s memory loss and rekindle their baseball dreams? With hilarious hijinks and fierce competition, get ready for a strikeout.',
  //     popularity: 131.815,
  //     poster_path: '/6mhVHKDOchX5xvVV2QXZAwnCHZQ.jpg',
  //     first_air_date: '2024-04-10',
  //     name: 'Oblivion Battery',
  //     vote_average: 0,
  //     vote_count: 0,
  //   },
  //   {
  //     adult: false,
  //     backdrop_path: '/a3Sdszoxb3oH7i79XiYKKAdsl6J.jpg',
  //     genre_ids: [16, 9648, 18],
  //     id: 218146,
  //     origin_country: ['JP'],
  //     original_language: 'ja',
  //     original_name: '怪異と乙女と神隠し',
  //     overview:
  //       'Sumireko Ogawa’s dream of becoming a novelist is reinvigorated with new rumors of mystical incidents. Now a clerk at a bookstore, she enlists her young coworker, Ren Adashino, to investigate urban legends, black magic, and ghost stories across the city. Sumireko has a knack for triggering magical events, and Ren has a dark secret of his own. Will they survive their investigation unscathed?',
  //     popularity: 94.003,
  //     poster_path: '/2S5ZCNmmio6wfXhmO9cZLEtzLL3.jpg',
  //     first_air_date: '2024-04-10',
  //     name: 'Mysterious Disappearances',
  //     vote_average: 7,
  //     vote_count: 1,
  //   },
  //   {
  //     adult: false,
  //     backdrop_path: '/fkcaYCLh5IV2SrwdmtdQGewPnWV.jpg',
  //     genre_ids: [16, 35, 18],
  //     id: 216760,
  //     origin_country: ['JP'],
  //     original_language: 'ja',
  //     original_name: '声優ラジオのウラオモテ',
  //     overview:
  //       'Yuhi Yugure and Yasumi Utatane, high school classmates and co-hosts of a weekly radio program, paint a picture-perfect friendship for their listeners. Yet, in reality, they couldn’t be more different. Their off-air dynamic is a whirlwind of chaos and insults. As their tumultuous relationship unfolds, they navigate the turbulent waters of friendship and rivalry in the cutthroat realm of showbiz.',
  //     popularity: 82.576,
  //     poster_path: '/733lDek9YYMfxplg0ELoi3mkRuH.jpg',
  //     first_air_date: '2024-04-10',
  //     name: 'The Many Sides of Voice Actor Radio',
  //     vote_average: 7,
  //     vote_count: 1,
  //   },
  //   {
  //     adult: false,
  //     backdrop_path: '/zAcBOll4cTyWEsqTJs31bWdWRRP.jpg',
  //     genre_ids: [16],
  //     id: 240399,
  //     origin_country: ['JP'],
  //     original_language: 'ja',
  //     original_name: 'リンカイ！',
  //     overview:
  //       "A high-school girl Itō, captivated by women's bicycle racing “Girls Keirin,” enters a training school and has a fateful encounter with Hiratsuka, who becomes both their lifelong rival and close friend. They practice and compete together, to realize their dream, to win the top title of Keirin athlete, “Girls' Fresh Queens”!",
  //     popularity: 65.36,
  //     poster_path: '/ncyJvQlcDX2RkMRHSRBYQX0weLs.jpg',
  //     first_air_date: '2024-04-09',
  //     name: 'Rinkai!',
  //     vote_average: 0,
  //     vote_count: 0,
  //   },
  // ];

  constructor(
    private animeService: ApiService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private cachingService: DataCacheService
  ) {}

  ngOnInit(): void {
    this.spinner.show();

    const popularAnime = this.cachingService.get('popularAnime');
    if (!popularAnime) {
      this.fetchAnimeData();
    } else {
      this.retrieveCachedData();
    }
  }

  retrieveCachedData() {
    this.popularAnimes = this.cachingService.get('popularAnime');
    this.recentlyRelesedAnimes = this.cachingService.get('recentAnime');    
    this.spinner.hide();
    this.sliderAnime();
  }


  fetchAnimeData() {
    this.animeService.getPupularWeekAnime(1).subscribe((res: any) => {
      this.popularAnimes = res.results;
    });
    this.animeService.getRecentReleasedAnime(1).subscribe((res: any) => {
      this.recentlyRelesedAnimes = res.results;
      this.spinner.hide();
    });
    this.sliderAnime();
  }

  fetchNextPage(nextpage: number) {
    this.spinner.show();
    this.currentPage = nextpage;
    this.animeService.getRecentReleasedAnime(nextpage).subscribe((res: any) => {
      this.recentlyRelesedAnimes = res.results;
      this.spinner.hide();
    });
  }
  sliderAnime() {
    setInterval(() => {
      if (this.index === 10) {
        this.index = 0;
        return;
      }
      this.index++;
    }, 5000);
  }

  navigateToAnime(id: number) {
    console.log(id);
    this.router.navigate(['anime', id]);
  }
}
