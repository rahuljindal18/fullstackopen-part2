import React from 'react'


const Part = (props) => (
    <p>{props.part} {props.exercise}</p>
)
const Header = (props) => (
    <h2>{props.course}</h2>
)

const Content = ({parts}) => {
    return(
        <div>
            {parts.map(part => <Part key={part.id} part={part.name} exercise={part.exercises}/>)}
        </div>
    )
}

const Total = (props) => (
    <h3>total of {props.parts.map(obj => obj.exercises).reduce((a,b) => a+b, 0)} exercises</h3>
)

const Course = ({course}) => {
    return(
        <>
            <Header course={course.name}/>
            <Content parts={course.parts}/>
            <Total parts={course.parts}/>
        </>
    )
}

export default Course