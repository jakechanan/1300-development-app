import './App.css';
import PlayerManager from './Components.jsx'
import React from "react";

const ALL_PLAYERS = [
  {
    name: "Hank Aaron",
    bats: "R",
    home_runs: 755,
    position: "OF",
    img: "https://static.onecms.io/wp-content/uploads/sites/20/2020/02/hank-aaron-2.jpg"
  }, {
    name: "Mickey Mantle",
    bats: "S",
    home_runs: 536,
    position: "OF",
    img: "https://cdn.britannica.com/09/197909-050-54ED9E9E/Mickey-Mantle-1966.jpg"
  }, {
    name: "Jackie Robinson",
    bats: "R",
    home_runs: 137,
    position: "IF",
    img: "https://miro.medium.com/max/1200/1*9RZlIDziPQKUdrpPMrNumg.jpeg"
  }, {
    name: "Ichiro Suzuki",
    bats: "L",
    home_runs: 117,
    position: "OF",
    img: "https://upload.wikimedia.org/wikipedia/commons/e/e3/Ichiro_Suzuki_on_May_11%2C_2011.jpg"
  }, {
    name: "Rickey Henderson",
    bats: "R",
    home_runs: 297,
    position: "OF",
    img: "https://i.pinimg.com/originals/2f/fa/8d/2ffa8d885666a42b5ed354f2f373f01b.jpg"
  }, {
    name: "Babe Ruth",
    bats: "L",
    home_runs: 714,
    position: "OF",
    img: "https://www.gannett-cdn.com/-mm-/3ba7e4f3567938bfa03b2db99f52682c4169c90e/c=31-0-799-1024/local/-/media/2018/04/11/Bergen/NorthJersey/636590591130423863-thegreatruthh.jpg"
  }, {
    name: "George Brett",
    bats: "L",
    home_runs: 317,
    position: "IF",
    img: "https://cdn2.bigcommerce.com/server400/karer354/products/165472/images/654023/P1570882__04479__97067__50364.1570223405.1280.1280.JPG?c=2"
  }, {
    name: "Honus Wagner",
    bats: "R",
    home_runs: 101,
    position: "IF",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Honus_wagner_t206_baseball_card.jpg/1200px-Honus_wagner_t206_baseball_card.jpg"
  }, {
    name: "Yogi Berra",
    bats: "L",
    home_runs: 358,
    position: "IF",
    img: "https://historicmissourians.shsmo.org/historicmissourians/name/b/berra/images/large/berra1.jpg"
  }, {
    name: "Yadier Molina",
    bats: "R",
    home_runs: 160,
    position: "IF",
    img: "https://upload.wikimedia.org/wikipedia/commons/2/28/Yadicatcher2014.jpg"
  }, {
    name: "Andre Dawson",
    bats: "R",
    home_runs: 438,
    position: "OF",
    img: "https://baseballhall.org/sites/default/files/styles/fullscreen_image_popup/public/islandora_images/Dawson%20Andre%201207-95_Act_NBL%20Cordes.jpg?itok=fcNDLGF5"
  }, {
    name: "Stan Musial",
    bats: "L",
    home_runs: 475,
    position: "OF",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Stan_Musial_-_St._Louis_Cardinals_-_1957.jpg/170px-Stan_Musial_-_St._Louis_Cardinals_-_1957.jpg"
  }, {
    name: "Miguel Cabrera",
    bats: "R",
    home_runs: 487,
    position: "IF",
    img: "https://www.gannett-cdn.com/presto/2019/01/24/PDTN/534576c7-abe2-470b-a895-e16d12e7d566-cabrera2.jpg?crop=2402,3202,x170,y0&quality=50&width=640"
  }, {
    name: "Ozzie Smith",
    bats: "S",
    home_runs: 28,
    position: "IF",
    img: "https://sabr.org/sites/default/files/Smith-Ozzie.png"
  }, {
    name: "Ernie Banks",
    bats: "R",
    home_runs: 512,
    position: "IF",
    img: "https://s.hdnux.com/photos/47/00/54/10226476/5/920x920.jpg"
  }, {
    name: "Lou Gehrig",
    bats: "L",
    home_runs: 493,
    position: "IF",
    img: "https://upload.wikimedia.org/wikipedia/commons/3/38/Lou_Gehrig_as_a_new_Yankee_11_Jun_1923.jpg"
  }, {
    name: "Joe DiMaggio",
    bats: "R",
    home_runs: 361,
    position: "OF",
    img: "https://sportscollectorsdigest.com/.image/t_share/MTY4MDAzMzgxMTg4MzcxNzI5/image-placeholder-title.jpg"
  }, {
    name: "Minnie Miñoso",
    bats: "R",
    home_runs: 186,
    position: "OF",
    img: "https://static01.nyt.com/images/2015/03/02/sports/02MINOSO1-obit/02MINOSO1-obit-superJumbo.jpg"
  }, {
    name: "Roberto Clemente",
    bats: "R",
    home_runs: 240,
    position: "OF",
    img: "https://lh4.googleusercontent.com/I1QSxLRal_JuATrdRtqLx8VbLdXPY_y9icrPQLulguPL8Kvmqzg_oVkyodbEfkR0Zma6QluVkFcvBGCii1HNIpqAyMrNg9-gq55gtXFaY-DDWlMhTlaqi5tFq_eALxKAPt3DjRZr"
  }, {
    name: "Chipper Jones",
    bats: "S",
    home_runs: 468,
    position: "IF",
    img: "https://cdn.bleacherreport.net/images_root/slides/photos/000/340/893/102684743_original.jpg?1281639668"
  }
];

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <h1>Baseball: Create your Lineup!</h1>
        <PlayerManager players={ALL_PLAYERS}></PlayerManager>
      </div>
    )
  }
}
