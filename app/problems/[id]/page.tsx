'use client'

import Topbar from "@/components/Topbar/Topbar";
import Workspace from "@/components/Workspace/Workspace";
import useHasMounted from "@/src/hooks/useHasMounted";
import { problems } from "@/src/dummy/problems";
import { Problem } from "@/src/types/problem";
import React from "react";

const ProblemPage = ({ params }: { params: { id: string } }) => {
	const hasMounted = useHasMounted();
	const { id } = params;
	const problem = problems[id];

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

