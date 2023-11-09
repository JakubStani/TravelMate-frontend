import NavBar from "../shared/NavBar";

function Home() {

  //changing site's title
  document.title = `TravelMate - Home`;

  return (
    <div className="App">
      <header className="App-header">
        <NavBar />
        <h1>This is a home screen</h1>
      </header>
    </div>
  );
}

export default Home;
