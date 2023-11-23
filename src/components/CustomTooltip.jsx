import React from 'react';

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        const diff = payload[1].value - payload[0].value;

        return (
            <div className="custom-tooltip">
                <div className="d-flex align-items-center justify-content-between">
                    <div className="tooltip-header">{label}</div>
                </div>
                <div className="tooltip-body text-center">
                    <div className="tooltip-tasks">Done tasks: {payload[1].value}</div>
                    <div className="tooltip-expected">Expected tasks: {payload[0].value}</div>
                    <div className={diff > 0 ? 'text-success' : 'text-danger'}>{diff}</div>
                </div>
            </div>
        )
    }

    return null;
}


export default CustomTooltip;