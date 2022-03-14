import React from "react";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import Drawer from '@material-ui/core/Drawer';

import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

import Divider from "@material-ui/core/Divider";
import { withStyles } from "@material-ui/core/styles";

import { Link } from "react-router-dom";


const styles = theme => ({
  nested: {
    paddingLeft: 28
  },
  drawer: {
    width: 350
  },
  drawerPaper: {
    width: 350,
  }
});

function getItems() {
  var json = {
    list: [
      {
        id: 1,
        title: "Charts",
        items: [
          {
            id: 1,
            name: "Column Charts",
            subitems: [
              {
                id: 1,
                name: "Basic",
                link: "/column-chart"
              },
              {
                id: 2,
                name: "Column with Data Labels",
                link: "/column-with-labels"
              },
              {
                id: 3,
                name: "Stacked Columns",
                link: "/stacked-column"
              },
              {
                id: 4,
                name: "Stacked Columns 100",
                link: "/stacked-column-100"
              },
              {
                id: 5,
                name: "Columns with Negative Values",
                link: "/column-with-negatives"
              }
            ]
          }
        ]
      }
    ]
  };
  return json;
}
class Menu extends React.Component {
  state = {};
  handleClick = e => {
    this.setState({ [e]: !this.state[e] });
  };
  render() {
    const items = getItems();
    const { classes } = this.props;
    return (
      <Drawer
        variant="permanent"
        className={classes.drawer}
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        {items.list.map(list => {
          return (
            <List
              key={list.id}
              subheader={
                <ListSubheader>{list.title}</ListSubheader>
              }
            >
              {list.items.map(item => {
                return (
                  <div key={item.id}>
                    {item.subitems != null ? (
                      <div key={item.id}>
                        <ListItem
                          button
                          key={item.id}
                          onClick={this.handleClick.bind(
                            this,
                            item.name
                          )}
                        >
                          <ListItemText
                            primary={item.name}
                          />
                          {this.state[item.name] ? (
                            <ExpandLess />
                          ) : (
                              <ExpandMore />
                            )}
                        </ListItem>
                        <Collapse
                          key={list.items.id}
                          component="li"
                          in={this.state[item.name]}
                          timeout="auto"
                          unmountOnExit
                        >
                          <List disablePadding>
                            {item.subitems.map(
                              sitem => {
                                return (
                                  <ListItem
                                    button
                                    key={
                                      sitem.id
                                    }
                                    className={
                                      classes.nested
                                    }
                                  >
                                    <Link to={sitem.link}>
                                      <ListItemText
                                        key={
                                          sitem.id
                                        }
                                        primary={
                                          sitem.name
                                        }
                                      />
                                    </Link>
                                  </ListItem>
                                );
                              }
                            )}
                          </List>
                        </Collapse>{" "}
                      </div>
                    ) : (
                        <ListItem
                          button
                          onClick={this.handleClick.bind(
                            this,
                            item.name
                          )}
                          key={item.id}
                        >
                          <ListItemText
                            primary={item.name}
                          />
                        </ListItem>
                      )}
                  </div>
                );
              })}
              <Divider key={list.id} absolute />
            </List>
          );
        })}
      </Drawer >
    );
  }
}

export default withStyles(styles)(Menu);
