import { useState, useEffect } from "react"
import ReadReactSpeech from "../helpers/Read_ReactSpeechSlow"
import ReadMessage from "../util/Read/ReadMessage"
import Dictaphone from "../helpers/RegcognitionV1-0-1AI0.5 _03"
import $ from "jquery"
let i = 0
export default function A2Words3000Practice(props) {
    const [DataCmd, setDataCmd] = useState(props.ArrPractice[0].word)
    const [practice, setpractice] = useState(props.ArrPractice[0])
    const [InterRim, setInterRim] = useState("")

    function Xuly(interim) {

        let input = interim.toLowerCase()
        try {
            if (input.includes(DataCmd)) {
                let i = input.split(DataCmd).join(`<i class="cmdInterrim">` + DataCmd + `</i>`)

                let str = `<div>` +
                    i
                    + `</div>`

                $("#res").html(str)
            } else {
                $("#res").text(input)
            }

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="A2Words3000Practice">
            <hr />
            <button
                className="btn btn-primary"
                onClick={() => {
                    i = (i + 1) % props.ArrPractice.length
                    setpractice(props.ArrPractice[i])
                    setDataCmd(props.ArrPractice[i].word)
                }}
            >
                Next
            </button>
            <button
                className="btn btn-primary"
                onClick={() => {
                    ReadMessage(props.ArrPractice[i].word, 1, 0.4, 1)
                }}
            >
                Read
            </button>
            <button
                className="btn btn-primary"
                onClick={() => {
                    $("#res").text("")
                }}
            >
                X
            </button>
            <div>
                {showWords([practice])}
            </div>
            {/* <p id="interrimID"></p> */}
            <div id="res"></div>
            <h1 >{InterRim}</h1>
            <ReadReactSpeech />
            <Dictaphone
                Data={DataCmd} Xuly={Xuly}
            />
            <button
                className="A2Words3000PracticeBtn"
                onClick={() => { props.SET_ArrPractice(null) }}
            >
                Exit
            </button>
            <div>{showDetail(practice.meanGoogle)}</div>
        </div>


    )
}


function showDetail(word) {
    try {

        return (
            <div className="A2Words3000PracticeMeanGoogle_I">
                {word.map((e, i) =>
                    <div key={i}>
                        {/* <h5>{e.word}</h5> */}
                        <hr />
                        {showMeaning(e.meaning)}
                    </div>
                )}
            </div>
        )
    } catch (error) {
        return null
    }
}

function showMeaning(Mean) {
    try {
        let ArrIn = Object.keys(Mean)
        return (
            <div className="A2Words3000PracticeMeanGoogle_II">
                {ArrIn.map((e, i) =>
                    <div key={i}>
                        <h5>Từ loại: {e}</h5>
                        {showMeaningDetail(Mean[e])}
                    </div>
                )}
            </div>
        )
    } catch (error) {
        return null
    }
}

function showMeaningDetail(Detail) {
    try {

        return (
            <div className="A2Words3000PracticeMeanGoogle_III">
                {Detail.map((e, i) =>
                    <div className="A2Words3000PracticeMeanGoogle_IIII" key={i}>
                        <b>Definition:</b>   {e.definition}
                        <br />
                        <b>Axample:</b>  <h5 style={{ color: "blue" }}>{e.example}</h5>
                        <br />
                        <b>Synonyms:</b> {showSynonyms(e.synonyms)}
                    </div>
                )}
            </div>
        )
    } catch (error) {
        return null
    }
}

function showSynonyms(Synonyms) {
    try {
        return (
            <div>
                {Synonyms.map((e, i) =>
                    <div className="A2Words3000ArrIndex" key={i}>{e}</div>
                )}
            </div>
        )
    } catch (error) {
        return null
    }
}

function showWords(Words) {
    try {
        return (
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>IPA_UK</th>
                        <th>IPA_US</th>
                        <th>Từ vựng</th>
                        <th>Từ loại</th>
                        <th>Nghĩa</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Words.map((e, i) =>
                            <tr key={i} >
                                <td className="iconX1">
                                    <i><b>{e.ipaUK}</b></i>
                                </td>
                                <td className="iconX1">
                                    <i><b>{e.ipaUS}</b></i>
                                </td>
                                <td >
                                    <i><b>{e.word}</b></i>
                                </td>
                                <td >
                                    <i><b>{e.partsOfSpeech}</b></i>
                                </td>
                                <td >
                                    <i><b>{e.mean}</b></i>
                                </td>

                            </tr>

                        )
                    }
                </tbody>

            </table>

        )
    } catch (error) {
        return null
    }
}
