import React from 'react';
import PropTypes from 'prop-types';

import cn from 'classnames';

import { palette } from 'config.json';
import styles from './VotesPieChart.module.css';

function getCoordinatesForPercent(percent) {
    const x = Math.cos(2 * Math.PI * percent);
    const y = Math.sin(2 * Math.PI * percent);
    return [x, y];
}

VotesPieChart.propTypes = {
    poll: PropTypes.shape({
        votesCount: PropTypes.number.isRequired,
        votes: PropTypes.arrayOf(PropTypes.shape({
            card: PropTypes.string.isRequired,
            count: PropTypes.number.isRequired
        }).isRequired).isRequired
    }),
    className: PropTypes.string
};

function VotesPieChart({ poll, className }) {
    const { votesCount, votes } = poll;

    if (!votesCount) {
        return (
            <svg viewBox='-100 -100 200 200' className={cn(className, styles.circle)}>
                <circle r='100'/>
                <text y='8' textAnchor='middle'>No votes yet.</text>
            </svg>
        );
    }
    
    let cumulatedPercent = 0;
    let memo = { idx: 0 };
    const elts = votes.map(({ card, count }, idx) => {
        const [startX, startY] = getCoordinatesForPercent(cumulatedPercent);
        const percent = count / votesCount;
        cumulatedPercent += percent;
        const [endX, endY] = getCoordinatesForPercent(cumulatedPercent);
        const largeArcFlag = percent > 0.5 ? 1 : 0;
        const pathData = [
            `M ${startX} ${startY}`, // Move
            `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`, // Arc
            `L 0 0`, // Line
        ].join(' ');

        let color;
        if (memo.percent === percent) {
            color = memo.color;
            memo.idx++
        } else {
            color = palette[(idx - memo.idx) % palette.length];
        }
        memo = { percent, color, idx: memo.idx }

        return (
            <path key={idx} d={pathData} fill={`rgb(${color.join(',')})`}>
                <title>{`Card ‘${card}‘ - ${count} votes (${percent.toFixed(1)}%)`}</title>
            </path>
        );
    });

    return (
        <svg viewBox='-1 -1 2 2' className={className} style={{transform: 'rotate(-90deg)'}}>
            {elts}
        </svg>
    );
}

export default VotesPieChart;
