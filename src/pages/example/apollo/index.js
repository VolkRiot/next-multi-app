import Link from 'next/link';
import { useQuery } from '@apollo/react-hooks';
import { NetworkStatus } from 'apollo-client';
import gql from 'graphql-tag';
import { withApollo } from '../../../withApollo';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Navbar from 'react-bootstrap/Navbar';

export const ALL_POSTS_QUERY = gql`
  query($number_of_repos: Int!) {
    viewer {
      login
      name
      repositories(last: $number_of_repos) {
        nodes {
          name
          primaryLanguage {
            name
          }
        }
      }
    }
  }
`;

export const numberReposQueryVars = {
  number_of_repos: 5,
};

function Index(props) {
  const queryProps = useQuery(ALL_POSTS_QUERY, {
    variables: numberReposQueryVars,
    // Setting this value to true will make the component rerender when
    // the "networkStatus" changes, so we are able to know if it is fetching
    // more data
    notifyOnNetworkStatusChange: false,
  });

  const { loading, error, data, fetchMore, networkStatus } = queryProps;

  // If Apollo client is not set to SSR
  if (loading) return <div>Loading</div>;

  const {
    viewer: { login, repositories },
  } = data;

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="#home">{`Github Data for User ${login}`}</Navbar.Brand>
      </Navbar>
      <Container>
        <h3>Repos Table</h3>
        <Row>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Repo Name</th>
                <th>Primary Language</th>
              </tr>
            </thead>
            <tbody>
              {repositories.nodes.map((repo, index) => (
                <tr key={index}>
                  <td>{repo.name}</td>
                  <td>{repo.primaryLanguage.name}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Row>
      </Container>
    </>
  );
}

// export default simpleIndex;

export default withApollo({ ssr: true })(Index);
