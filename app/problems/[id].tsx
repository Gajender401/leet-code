'use client'

import Topbar from "@/components/Topbar/Topbar";
import Workspace from "@/components/Workspace/Workspace";
import useHasMounted from "@/src/hooks/useHasMounted";
import { problems } from "@/src/dummy/problems";
import { Problem } from "@/src/types/problem";
import React from "react";

type ProblemPageProps = {
	problem: Problem;
};

const ProblemPage: React.FC<ProblemPageProps> = ({ problem }) => {
	const hasMounted = useHasMounted();

	if (!hasMounted) return null;

	return (
		<div>
			<Topbar problemPage />
			<Workspace problem={problem} />
		</div>
	);
};
export default ProblemPage;

// fetch the local data

// getStaticPaths => it create the dynamic routes
export async function getStaticPaths() {
	const paths = Object.keys(problems).map((key) => ({
		params: { pid: key },
	}));

	return {
		paths,
		fallback: false,
	};
}

// getStaticProps => it fetch the data

export async function getStaticProps({ params }: { params: { id: string } }) {
	const { id } = params;
	const problem = problems[id];

	if (!problem) {
		return {
			notFound: true,
		};
	}
	problem.handlerFunction = problem.handlerFunction.toString();
	return {
		props: {
			problem,
		},
	};
}