import * as React from 'react';
import './TopBanner.scss';
import {Button} from 'react-bootstrap/lib/InputGroup';
import {LinkContainer} from 'react-router-bootstrap';

interface ITopBannerProps {
  title: string;
  leftButtonText?: string;
  rightButtonText?: string;
  leftButtonURL?: string;
  rightButtonURL?: string;
  //  onChange?: (value: string) => void;
}

export default class TopBanner extends React.Component<ITopBannerProps> {
  render() {
    return (
      <div className="topBanner">
        <div className="left">
          {this.props.leftButtonURL !== '' &&
          typeof this.props.leftButtonURL !== 'undefined'
            ? <LinkContainer to={this.props.leftButtonURL}>
                <Button href="#" className="button">
                  <div>
                    {this.props.leftButtonText}
                  </div>
                </Button>
              </LinkContainer>
            : <Button href="#" className="button">
                <div>
                  {this.props.leftButtonText}
                </div>
              </Button>}
        </div>
        <div className="middle">
          <div className="title">
            {this.props.title}
          </div>
        </div>
        <div className="right">
          {this.props.rightButtonURL !== '' &&
          typeof this.props.rightButtonURL !== 'undefined'
            ? <LinkContainer to={this.props.rightButtonURL}>
                <Button href="#" className="button">
                  <div className="rightButtonText">
                    {this.props.rightButtonText}
                  </div>
                </Button>
              </LinkContainer>
            : <Button href="#" className="button">
                <div className="rightButtonText">
                  {this.props.rightButtonText}
                </div>
              </Button>}
        </div>
      </div>
    );
  }
}
