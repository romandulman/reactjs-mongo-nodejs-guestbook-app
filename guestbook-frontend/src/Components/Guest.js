import React, { Component } from "react";
import "./Styles.css";
//import Card from "react-bootstrap/Card";
//import Button from "react-bootstrap/Button";
import { connect } from "react-redux";

import Card from '@material-ui/core/Card';
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const mapStateToProps = state => {
  return {
    showDeleteBtn: state.showDeleteBtn
  };
};
class Guest extends Component {
  handleRemove = () => {
    this.props.RemoveHandler(this.props.Id);
  };

  render() {
    return (
      <Card className="card">

        {this.props.imageName && (
          <p>
            <br />
            <img src={this.props.imageName} alt="GuestImage" />
          </p>
        )}
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {this.props.guestName}
          </Typography>
          <Typography variant="body1" color="textSecondary" component="p">
            {this.props.guestBody}
          </Typography>
        </CardContent>
        <CardActions>
          <footer className="blockquote-footer">
            Best Regards,
            <cite title="Source Title"> {this.props.guestName}</cite>
          </footer>
        </CardActions>
        <CardActions>
          {this.props.showDeleteBtn && (
            <Button variant="outline-danger" onClick={this.handleRemove}>
              Remove Guest
            </Button>
          )}
        </CardActions>
      </Card>

      /*<Card className="guestSty">
        <Card.Header>{this.props.guestName}</Card.Header>
        <Card.Body>
          <blockquote className="blockquote mb-0">
            <p>{this.props.guestBody}</p>
            {this.props.imageName && (
              <p>
                <img src={this.props.imageName} alt="Logo" />
              </p>
            )}
            <footer className="blockquote-footer">
              Best Regards,{" "}
              <cite title="Source Title">{this.props.guestName}</cite>
            </footer>
            <br />
            {this.props.showDeleteBtn && (
              <Button variant="outline-danger" onClick={this.handleRemove}>
                Remove Guest
              </Button>
            )}
          </blockquote>
        </Card.Body>
      </Card>*/
    );
  }
}

export default connect(mapStateToProps)(Guest);
