import React, { Fragment } from "react";
import { Grid, Loader } from "semantic-ui-react";

const ItemList = ({ visibleItems }) => {
  return (
    <Fragment>
      {!visibleItems ? (
        <Loader active>Loading</Loader>
      ) : visibleItems.length ? (
        <Grid>
          <Grid.Row columns={2}>
            {visibleItems.map(item => (
              <Grid.Column key={item.id}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                <br />
              </Grid.Column>
            ))}
          </Grid.Row>
        </Grid>
      ) : (
        <p className="noresults">No search results</p>
      )}
    </Fragment>
  );
};

export default ItemList;
