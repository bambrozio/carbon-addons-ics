import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import ActionIcon from '../ActionIcon';

export default class Tag extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showTag: true,
    };
  }

  static propTypes = {
    action: PropTypes.string,
    actionDescription: PropTypes.string,
    children: PropTypes.node,
    className: PropTypes.string,
    onBlur: PropTypes.func,
    onClick: PropTypes.func,
    onFocus: PropTypes.func,
    onKeyDown: PropTypes.func,
    onKeyUp: PropTypes.func,
    onMouseDown: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onMouseUp: PropTypes.func,
    remove: PropTypes.bool,
    role: PropTypes.string,
    style: PropTypes.oneOf(['dark', 'light']),
    tabindex: PropTypes.string,
  };

  static defaultProps = {
    action: null,
    remove: false,
    role: 'tag',
    style: 'dark',
    tabindex: '0',
  };

  buildAction = () => {
    const { action, actionDescription, actionFunction, onClick } = this.props;
    const iconFunction = actionFunction ? actionFunction : onClick;

    if (action) {
      const actionClasses = classNames({
        'bx--tag__left': true,
        [`bx--tag__left--${action}`]: true,
      });

      return (
        <div className={actionClasses}>
          <ActionIcon
            rounded
            icon={action === 'remove' ? 'error' : action}
            iconDescription={actionDescription}
            tabIndex={0}
            onClick={action === 'remove' ? this.removeTag : iconFunction}
          />
        </div>
      );
    }

    return;
  };

  removeTag = () => {
    this.setState({ showTag: false });
  };

  render() {
    const {
      actionFunction, // eslint-disable-line no-unused-vars
      actionDescription, // eslint-disable-line no-unused-vars
      children,
      className,
      style,
      role,
      tabindex,
      remove,
      ...rest
    } = this.props;

    const tagClasses = classNames({
      'bx--tag': true,
      'bx--tag--remove': remove,
      'bx--tag--dark': style === 'dark',
      'bx--tag--light': style === 'light',
      [className]: className,
    });

    const actionIcon = this.buildAction();

    return this.state.showTag ? (
      <li className="bx--tag__item">
        {actionIcon}
        <span className={tagClasses} tabIndex={tabindex} role={role} {...rest}>
          {children}
          {remove && (
            <div className="bx--tag__remove-icon">
              <ActionIcon
                rounded
                icon="close"
                iconDescription="remove tag"
                onClick={this.props.onClick || this.removeTag}
              />
            </div>
          )}
        </span>
      </li>
    ) : (
      ''
    );
  }
}
