import React from 'react';

const CustomTooltip = () => (
    <div className="rounded-xl overflow-hidden tooltip-head">
        <div className="flex items-center justify-between p-2">
            <div className="">Revenue</div>
        </div>
        <div className="tooltip-body text-center p-3">
            <div className="text-white font-bold">$1300.50</div>
            <div className="">Revenue from 230 sales</div>
        </div>
    </div>
);

export default CustomTooltip;