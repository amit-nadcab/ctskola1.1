import React from "react";



export default function Card(props) {


    return (
        <>
            <div className="card py-3" style={{ width: "25rem", height: "24rem", backgroundColor: "#1E2738", color: "#01D092",borderRadius:"10px" }}>
                <div className="card-body">
                    <div className="rounded-circle shadow rounded mb-2" style={{ height: "70px", width: "70px", backgroundColor: "#2D3748"}}>
                        {props.comp}
                    </div> <br />
                    <h5 class="card-title text-left">{props.title}</h5>

                    <p className="card-text font-size-18">{props.content}</p>

                </div>
            </div>
        </>
    );
}
