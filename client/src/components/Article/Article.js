import React from 'react';
import './Article.css';
import WrappedLink from '../WrappedLink/WrappedLink';
import { Icon, Label, Menu, Table } from 'semantic-ui-react';
import { Link } from 'react-router-dom'; 
import { useHistory, useParams } from "react-router-dom";

const Article = (props) => {
    let history = useHistory();
    
    const handleClick = itemId => {
        history.push('/articles/' + itemId);
      };

    return (
        <Table.Row onClick={() => {
            handleClick(props.id);
          }}>
            <Table.Cell>
                <Link to={'/articles/' + props.id}>
                    {props.title}
                </Link>
            </Table.Cell>
            <Table.Cell>{props.work_date}</Table.Cell>
            <Table.Cell>{props.work_time}</Table.Cell>
            <Table.Cell>{props.job_creator}</Table.Cell>
                

            {/* <WrappedLink
                to={'/articles/' + props.id}
                buttonClasses={['btn', 'btn-info', 'ViewButton']}
            >View</WrappedLink> */}
        </Table.Row>
    );
}

export default Article;
