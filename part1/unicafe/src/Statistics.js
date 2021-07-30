import React from 'react'
import StatisticLine from './StatisticLine'

const Statistics = ({ good, neutral, bad, all }) => {
    if (all != 0) {
        return (
            <table>
                <thead></thead>
                <thead></thead>
                <tbody>
                    <StatisticLine text="good" value={good} />
                    <StatisticLine text="neutral" value={neutral} />
                    <StatisticLine text="bad" value={bad} />
                    <StatisticLine text="all" value={all} />
                    <StatisticLine text="average" value={(good - bad) / all} />
                    <StatisticLine text="positive" value={`${good / all * 100} %`} />
                </tbody>
            </table>

        )
    }
    return (
        <div>
            No feedback given
        </div>
    )

}

export default Statistics