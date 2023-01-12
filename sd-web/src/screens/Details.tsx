import React from 'react'
import {useParams } from 'react-router-dom';

export default function Details(){
  const {id, name} = useParams();

  console.log("passed", name)
  return (
    <div>
    <h1>{id}{name}</h1>
    </div>
  )
}
