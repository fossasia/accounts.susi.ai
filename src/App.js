import React, { Component } from 'react';
import './App.css';
class App extends Component {
  render() {
    return (
      <div style={{"position": "relative", margin: "0px", "minHeight": "100%"}} data-gr-c-s-loaded="true"> 
          <nav className="navbar navbar-inverse navbar-fixed-top">
            <div className="container-fluid">
              <div className="navbar-header">
                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
                <a className="navbar-brand" href="#"></a>
              </div>
              <div id="navbar" className="navbar-collapse collapse">
                <ul className="nav navbar-nav navbar-right"><li><a href="/index.html">Home</a></li><li><a href="/api.html">API</a></li><li><a href="/apps/applist/index.html">Account</a></li>
                </ul>
              </div>
            </div>
          </nav>          
          <div className="jumbotron">
            <div className="container">
              <h1><code>api.susi.ai</code></h1>
              <h2>Software and Rules for Personal Assistants</h2>
              <span style={{"fontWeight": "bold"}}>
                Chat with a Personal Assistant: Artificial Intelligence for Information Retrieval.
              </span>&nbsp;
                
                <form action="http://api.susi.ai/susi/chat.json?q=tesesrje" className="col-lg-12 hidden-xs ng-pristine ng-valid" style={{"marginTop" : "20px"}} target="_blank">
                  <input id="timezoneOffset0" type="hidden" name="timezoneOffset" value="-330"/>
                  <script>document.getElementById("timezoneOffset0").value = new Date().getTimezoneOffset(),</script>
                  <div className="input-group input-group-lg col-sm-8" style={{"float":"left"}}>
                    <input name="q" id="query" type="text" className="center-block form-control input-lg" title="Search Twitter and the loklak network" placeholder="Chat with Susi" autoFocus=""/>
                    <span className="input-group-btn"><button className="btn btn-lg btn-primary" type="submit" target="_blank">Get JSON Data</button></span>
                  </div>
                </form>

                <form action="#" className="col-lg-12 hidden-lg hidden-md hidden-sm row ng-pristine ng-valid">
                  <input id="timezoneOffset1" type="hidden" name="timezoneOffset" value="-330"/>
                  <script>document.getElementById("timezoneOffset1").value = new Date().getTimezoneOffset(),</script>
                  <div className="input-group input-group-lg row col-sm-12" style={{"float":"left","display": "flex","flexWrap": "wrap"}}>
                    <input name="q" id="query" type="text" className="center-block form-control input-lg" title="Search Twitter and the loklak network" placeholder="Search Twitter &amp; the loklak network" style={{"borderBottomWidth": "5px","paddingRight": "12px"}} />
                      <span className="input-group-btn"><button className="btn btn-lg btn-primary" type="submit" target="_blank" >Get JSON Data</button></span>
                  </div>
                  <span style={{"fontSize":"7pt"}}>
                
            </span></form></div>
          </div>

          <div className="container">

            <footer style={{"position": "absolute", "right": "0", "bottom": "-50px", "left": "0", "padding": "1rem", "textAlign": "center"}}>
              <p>Nice? To get latest news about <code>susi</code>, follow <a href="https://twitter.com/0rb1t3r"><code>@0rb1t3r</code></a>.  Help to spread the news: <a className="btn btn-default" href="https://twitter.com/intent/tweet?hashtags=loklak&amp;original_referer=http%3A%2F%2Fsusi.ai&amp;text=%23susi%20%23personal%20%23assistant&amp;tw_p=tweetbutton&amp;url=http%3A%2F%2Fsusi.ai" role="button">tweet about this »</a></p>
            </footer>
          </div>
          </div>
        

    );
  }
}

export default App;
