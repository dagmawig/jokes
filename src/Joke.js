import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import { Card, CardBody, CardHeader } from 'reactstrap'
import './App.css';
import $ from 'jquery'


//joke data format
// const joke1 = {
//     "error": false,
//     "category": "Dark",
//     "type": "twopart",
//     "setup": "What did the boy with no arms get for Christmas?",
//     "delivery": "I don't know, he hasn't opened it yet.",
//     "flags": {
//         "nsfw": true,
//         "religious": true,
//         "political": false,
//         "racist": false,
//         "sexist": false
//     },
//     "id": 146,
//     "lang": "en"
// }

const url = "https://sv443.net/jokeapi/v2/joke/any"


class Joke extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentJoke: [], home: true, category: '', nsfw: '', religious: '', political: '', racist: '', sexist: '', body: ''
        }
        this.getJoke = this.getJoke.bind(this)
    }

    getJoke() {
       
        console.log($('.collapse').is(':visible'))

        // to collapse a joke with a punchline when next button is clicked
        if($('.collapse').is(':visible') && document.getElementById("hide")){
            document.getElementById("hide").click();
        }

        //fetch random joke using the url
        fetch(`${url}`)
            .then((res) => res.json())
            .then(jokeData => {
                console.log('yeah', jokeData);
                this.setState({
                    currentJoke: jokeData, home: false, category: jokeData.category,
                    nsfw: (jokeData.flags.nsfw) ? (<i> NSFW </i>) : (<></>),
                    religious: (jokeData.flags.religious) ? (<i> religious </i>) : (<></>),
                    political: (jokeData.flags.political) ? (<i> political </i>) : (<></>),
                    racist: (jokeData.flags.racist) ? (<i> racist </i>) : (<></>),
                    sexist: (jokeData.flags.sexist) ? (<i> sexist</i>) : (<></>),
                    body: (jokeData.type === 'twopart') ? (
                        <>
                            <button id="hide" className="btn btn-primary" type="button" data-toggle="collapse" data-target="#delivery"><b>{jokeData.setup}</b></button>
                            <div id="delivery" className="collapse">{jokeData.delivery}</div>
                        </>
                    ) : (
                            <>
                                {jokeData.joke}
                            </>)
                })
            })


    }

  
    render() {

        return (
            <>
                <Card>
                    <CardHeader className="bg-info">
                        {(this.state.home) ? (<>
                            <p><b>Some of these jokes could be offensive.</b></p>
                            <p><b>Click at your own risk!!</b></p></>) : (<p><b>Tag:</b> {this.state.category}{this.state.nsfw}{this.state.religious}{this.state.political}{this.state.racist}{this.state.sexist} </p>)}
                    </CardHeader>
                    <CardBody className="bg-secondary body">
                        {(this.state.home) ? (<button id="start" className="btn btn-primary" type="button" onClick={this.getJoke}>Generate JOKE</button>) :
                            (<>
                                {this.state.body}
                                <br /><br />
                                <button className="btn btn-warning hide-it" type="button" onClick={()=>{this.getJoke() }}>NEXT</button>
                            </>)}
                    </CardBody>
                </Card>
            </>
        )
    }
}

export default Joke