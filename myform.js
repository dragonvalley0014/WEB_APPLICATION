import React, { useEffect, useState } from "react";

class myform extends React.Component{
    constructor(props)
    {
        super(props)

        this.state={
            name: '',
            mobile: '',
            gender: 'Male'
        }
    }

    changeHandler = (event) => {
        this.setState({[event.target.name]: event.target.value })

       // alert(JSON.stringify(this.state))
    }

    submitHandler = (event) => {
       // event.preventDefault();

       

        //FETCH API CODE BELOW
        fetch(
            'http://localhost:5000/savedata', {
                method:'POST',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify(this.state),
                
            }
         ).then(response => response.json())
         .then(data => {
                        
            alert(data.response)});
    }

    render(){
        return(
            <form onSubmit={this.submitHandler}>
                <table>
                    <tr>
                        <td><label>Name:</label></td>
                        <td><input type="text" name="name" onChange={this.changeHandler}/></td>
                    </tr>
                    <tr>
                    <td><label>Mobile:</label></td>
                        <td>
                            <input type="number" name="mobile" onChange={this.changeHandler}/>
                            </td>
                    </tr>
                    <tr>
                    <td><label>Gender:</label></td>
                        <td>
                             <select name="gender" onChange={this.changeHandler}>
                                <option>Male</option>
                                <option>Female</option>
                                <option>Other</option>
                            </select> 
                            </td>
                    </tr>
                    <tr>
                    <td> 
                        <input type="submit" value="SAVE DATA"/>
                        </td>
                        
                    </tr>
                </table>
            </form>
        )
    }
}

export default myform;
