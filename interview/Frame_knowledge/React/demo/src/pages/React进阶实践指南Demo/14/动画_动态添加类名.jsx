import React from 'react';

export default () => {
    const [isAnimation, setAnimation] = React.useState(false);
    return (
        <div>
            <button>改变颜色</button>
            <div></div>
        </div>
    )
}