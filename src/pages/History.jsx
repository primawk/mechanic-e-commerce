import React from "react":

class History extends React.Component {


render() {
    return (

        <div className="p-5">
             <h1>Transaction History</h1>
        <div className="row mt-5">
          <div className="col-8">
           
            <table className="table">
            <thead className="thead-light">
              
                <tr>
                  <th>Transaction Date</th>
                  <th>Total Items</th>
                  <th>Total Price</th>
                  <th>Action</th>
                  </tr>
                  </thead>
                  <tbody>
                      <tr>
                          <td>10-3-2021</td>
                          <td>3 Items(s)</td>
                          <td>Rp 120.000</td>
                          <td><button className="btn btn-info">See details</button>
                          </td>
                      </tr>
                  </tbody>
                
                

 