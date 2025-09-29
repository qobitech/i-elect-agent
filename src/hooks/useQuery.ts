import queryString from 'query-string';
import { useLocation } from 'react-router';

export const useQuery = () => {
	const location = useLocation();
	const { search } = location;
	const values = queryString.parse(search) as Record<string, string>;
	return values;
};
