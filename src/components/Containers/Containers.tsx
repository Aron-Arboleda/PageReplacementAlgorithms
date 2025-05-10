/**
 * Containers.tsx file contains all of the container react components
 * that i created to be re-used in different parts of the application.
 */

import { multiplyString } from "@utils/helpers/helpers";
import "./Containers.css";
import { Heading2Text, OneLineLabelValueText } from "@components/Texts/Texts";
import { OutputType } from "@utils/helpers/classes/PageReplacementAlgorithm";

export const LargeContainer = ({ children }: { children: React.ReactNode }) => {
	return <div className="largeContainer">{children}</div>;
};

export const CardTitle = ({
	title,
	style,
}: {
	title: string;
	style?: React.CSSProperties;
}) => {
	return (
		<h2 className="cardTitle" style={style}>
			{title}
		</h2>
	);
};

export const CardContainer = ({
	children,
	style,
	title = "Card Title",
}: {
	children: React.ReactNode;
	style?: React.CSSProperties;
	title: string;
}) => {
	return (
		<div className="cardContainer" style={style}>
			<CardTitle title={title} />
			<div className="cardBody">{children}</div>
		</div>
	);
};

export const GridContainer = ({
	children,
	style,
	size,
}: {
	children: React.ReactNode;
	style?: React.CSSProperties;
	size: string;
}) => {
	const newStyle: React.CSSProperties = {
		display: "grid",
		gridTemplateColumns: `repeat(auto-fill, minmax(${size}, 1fr))`,
		...style,
	};
	return (
		<div className="gridContainer" style={newStyle}>
			{children}
		</div>
	);
};

export const GridContainerFixed = ({
	children,
	style,
	noOfGroups = 2,
}: {
	children: React.ReactNode;
	style?: React.CSSProperties;
	noOfGroups?: number;
}) => {
	const newStyle: React.CSSProperties = {
		display: "grid",
		gridTemplateColumns: multiplyString("1fr ", noOfGroups),
		gap: "2rem",
		...style,
	};
	return (
		<div className="gridContainerFixed" style={newStyle}>
			{children}
		</div>
	);
};

export const FlexContainer = ({
	children,
	style,
}: {
	children: React.ReactNode;
	style?: React.CSSProperties;
}) => {
	const newStyle: React.CSSProperties = {
		display: "flex",
		flexDirection: "column",
		gap: "1rem",
		...style,
	};
	return <div style={newStyle}>{children}</div>;
};

export const WhiteContainer = ({
	children,
	style,
}: {
	children: React.ReactNode;
	style?: React.CSSProperties;
}) => {
	return (
		<div className="whiteContainer" style={style}>
			{children}
		</div>
	);
};

export const State = ({ data }: { data: OutputType }) => {
	return (
		<div className="stateContainer">
			<div className="pageNumberContainer">{data.pageNumber}</div>
			<div className="tableContainer">
				<table className="memoryTable">
					<tbody>
						{data.memoryState.map((item, index) => (
							<tr key={index}>
								<td>{item !== null ? item : ""}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

interface AlgorithmInterfaceComponentProps {
	title: string;
	data: OutputType[];
	label: string;
	value: string | number;
}

export const AlgorithmInterfaceComponent = ({
	title,
	data,
	label,
	value,
}: AlgorithmInterfaceComponentProps) => {
	console.log("AlgorithmInterfaceComponent data:", data);

	return (
		<div className="algorithmInterfaceComponent">
			<Heading2Text text={title} />
			<WhiteContainer>
				<div className="statesWrapper">
					{data.map((item, index) => (
						<State key={index} data={item} />
					))}
				</div>
			</WhiteContainer>
			<OneLineLabelValueText label={label} value={value} />
		</div>
	);
};
