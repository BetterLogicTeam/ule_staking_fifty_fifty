import React from 'react'

export default function Spinner_data({Unstake_NFT,spinner}) {
    return (
        <>
            {
                spinner ? (
                    <>
                        <div class="spinner-border" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </>
                ) :
                    (
                        <>
                            <button className="btn btn-success" onClick={() => Unstake_NFT()}>unstake</button>



                        </>
                    )
            }

        </>
    )
}
