import Link from 'next/link';
import { useQuery } from '@apollo/react-hooks';
import { NetworkStatus } from 'apollo-client';
import gql from 'graphql-tag';
import { withApollo } from '../../withApollo';

export const ALL_POSTS_QUERY = gql`
  query {
    viewer {
      login
    }
  }
`;

// export const allPostsQueryVars = {
//   skip: 0,
//   first: 10,
// };

// function simpleIndex() {
//   debugger;
//   return <div>Simple example</div>;
// }

function Index(props) {
  const { loading, error, data, fetchMore, networkStatus } = useQuery(
    ALL_POSTS_QUERY,
    {
      // variables: allPostsQueryVars,
      // Setting this value to true will make the component rerender when
      // the "networkStatus" changes, so we are able to know if it is fetching
      // more data
      notifyOnNetworkStatusChange: true,
    }
  );

  // debugger;
  if (loading) return <div>Loading</div>;

  const { viewer } = data;

  return (
    <div>
      <p>{`Github User data for user ${viewer.login}`}</p>
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

export default withApollo({ ssr: true })(Index);
