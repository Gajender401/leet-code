'use client'

import Topbar from "@/components/Topbar/Topbar";
import Workspace from "@/components/Workspace/Workspace";
import useHasMounted from "@/src/hooks/useHasMounted";
import { problems } from "@/src/dummy/problems";
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
