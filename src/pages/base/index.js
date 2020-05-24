import Link from 'next/link';
import { useQuery } from '@apollo/react-hooks';
import { NetworkStatus } from 'apollo-client';
import gql from 'graphql-tag';
import { withApollo } from '../../withApollo';

export const ALL_POSTS_QUERY = gql`
  query($number_of_repos: Int!) {
    viewer {
      login
      name
      repositories(last: $number_of_repos) {
        nodes {
          name
        }
      }
    }
  }
`;

export const numberReposQueryVars = {
  number_of_repos: 5,
};

// function simpleIndex() {
//   debugger;
//   return <div>Simple example</div>;
// }

function Index(props) {
  const { loading, error, data, fetchMore, networkStatus } = useQuery(
    ALL_POSTS_QUERY,
    {
      variables: numberReposQueryVars,
      // Setting this value to true will make the component rerender when
      // the "networkStatus" changes, so we are able to know if it is fetching
      // more data
      notifyOnNetworkStatusChange: true,
    }
  );

  if (loading) return <div>Loading</div>;

  // const { viewer } = data;

  return (
    <div>
      {data && <p>{`Github User data for user ${data.viewer.login}`}</p>}
    </div>
    // <ul>
    //   <li>
    //     <Link href="/base/b">
    //       <a>a</a>
    //     </Link>
    //   </li>
    //   <li>
    //     <Link href="/base/a">
    //       <a>b</a>
    //     </Link>
    //   </li>
    // </ul>
  );
}

// export default simpleIndex;

export default withApollo({ ssr: false })(Index);
