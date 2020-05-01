import PropTypes from 'prop-types'
import React from 'react'

const Container = ({ children, isFinished, animationDuration }) => (
    <div
        style={{
            opacity: isFinished ? 0 : 1,
            pointerEvents: 'none',
            transition: `opacity ${animationDuration}ms ease-in`,
        }}
    >
        {children}
    </div>
);

Container.propTypes = {
    animationDuration: PropTypes.number.isRequired,
    children: PropTypes.node.isRequired,
    isFinished: PropTypes.bool.isRequired,
};

export default Container