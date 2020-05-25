import Link from 'next/link';
import { useQuery } from '@apollo/react-hooks';
import { NetworkStatus } from 'apollo-client';
import gql from 'graphql-tag';
import { withApollo } from '../../../withApollo';

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

  if (loading) return <div>Loading</div>;

  const {
    viewer: { login, repositories },
  } = data;

  return (
    <div>
      <h1>{`Github User data for user ${login}`}</h1>
      <h3>Repos Table</h3>

      <table>
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
      </table>

      {/* <table>
        <thead>
        {repositories.nodes.map((repo, index) => (
          <li key={index}>
            <div>{`Repo name ${repo.name}`}</div>
          </li>
        ))}
      </table> */}
    </div>
  );
}

// export default simpleIndex;

export default withApollo({ ssr: true })(Index);
