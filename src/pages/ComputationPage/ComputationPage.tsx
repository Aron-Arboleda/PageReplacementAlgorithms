/**
 * This is the core UI component of the application.
 * It represents the Computation Page in its entirety.
 * This is where all the inputs are gathered and all the outputs are shown.
 */

import Button, { CopyButton, FieldButton } from "@components/Button/Button";
import {
	AlgorithmInterfaceComponent,
	CardContainer,
	FlexContainer,
	GridContainerFixed,
	LargeContainer,
	WhiteContainer,
} from "@components/Containers/Containers";
import Main from "@components/Containers/Main";
import {
	BodyTitle,
	Heading2Text,
	HighlightedResultText,
	InfoLabel,
	InfoValue,
} from "@components/Texts/Texts";
import { Results } from "@utils/helpers/classes/Results";

import {
	generateRandomNumberString,
	handleNumericInput,
	handleNumericPaste,
} from "@utils/helpers/helpers";
import { computeResultsSeparate } from "@utils/workers/computationThreads/workerHandler.js";
import { Box, Loader, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { SubmitHandler, useController, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "./ComputationPage.css";
import { useComputing } from "@contexts/ComputingContext";
import { useResults } from "@contexts/ResultsContext";

export interface ComputationInputs {
	referenceString: string;
	noOfFrames: number;
}

const defaultValuesForInputs = {
	referenceString: "7,0,1,2,0,3,0,4,2,3,0,3,2,1,2,0,1,7,0,1",
	noOfFrames: 3,
};

const ComputationPage = () => {
	const [isCalculating, setIsCalculating] = useState(false);
	const { setComputing } = useComputing();
	const { resultsGeneral, setResultsGeneral } = useResults();

	const [results, setResults] = useState<Results | null>(null);
	const referenceStringRef = useRef<HTMLTextAreaElement>(null);

	const inputsDefaultValues = resultsGeneral
		? resultsGeneral
		: defaultValuesForInputs;

	useEffect(() => {
		if (resultsGeneral) {
			setResults(resultsGeneral);
		}
	}, [resultsGeneral]);

	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm<ComputationInputs>({
		defaultValues: inputsDefaultValues,
	});

	const { field, fieldState } = useController({
		name: "referenceString",
		rules: {
			required: "Reference String is required",
			pattern: {
				value: /^[0-9,\s]+$/,
				message: "Invalid reference string format",
			},
		},
		control,
	});

	const onSubmit: SubmitHandler<ComputationInputs> = async (data) => {
		setIsCalculating(true);
		setComputing(true);

		try {
			// Use the updated computeResultsSeparate that returns a Results instance directly
			const resultsInstance = await computeResultsSeparate(data);

			// No need for parsing as the worker handler now returns the proper type
			setResults(resultsInstance);
			setResultsGeneral(resultsInstance);

			setIsCalculating(false);
			setComputing(false);

			toast.success("Results successfully calculated.", {
				autoClose: 2000,
			});
		} catch (error) {
			toast.error(
				`Page Replacement Algorithms execution error: "${
					error instanceof Error ? error.message : String(error)
				}"`
			);

			setResults(null);
			setResultsGeneral(null);
			setIsCalculating(false);
			setComputing(false);
		}
	};

	const handleGenerateRandom = () => {
		const randomString = generateRandomNumberString();
		setValue("referenceString", randomString);

		setTimeout(() => {
			if (referenceStringRef.current) {
				referenceStringRef.current.style.height = "auto";
				referenceStringRef.current.style.height = `${referenceStringRef.current.scrollHeight}px`;
			}
		}, 0);
	};

	return (
		<Main>
			<LargeContainer>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="headingContainer">
						<BodyTitle title={"Page Replacement Algorithms"} />
					</div>
					<div className="bodyContainer">
						<GridContainerFixed
							style={{
								display: "grid",
								gridTemplateColumns: "20% 1fr",
								gap: "2rem",
							}}
						>
							<div>
								<CardContainer title="Inputs">
									<div className="inputField">
										<label htmlFor="referenceString">Reference String</label>
										<div className="field">
											<div className="fieldActionButtons">
												<FieldButton
													onClick={handleGenerateRandom}
													Icon={Box}
													tooltip="Generate Random"
												/>
												<CopyButton text={field.value} />
											</div>
											<textarea
												id="referenceString"
												className="fieldInside"
												rows={1}
												ref={(e) => {
													referenceStringRef.current = e;
													field.ref(e);
												}}
												value={field.value}
												onChange={(e) => {
													field.onChange(e);
													const target = e.target as HTMLTextAreaElement;
													target.style.height = "auto";
													target.style.height = `${target.scrollHeight}px`;
												}}
												onBlur={field.onBlur}
											/>
										</div>
										{fieldState.error && (
											<span className="error">{fieldState.error.message}</span>
										)}
									</div>
									<div className="inputField">
										<label htmlFor="noOfFrames">Number of Frames</label>
										<input
											type="number"
											id="noOfFrames"
											min={1}
											{...register("noOfFrames", {
												required: "Number of columns is required",
												min: {
													value: 1,
													message: "At least one column is required",
												},
												valueAsNumber: true,
											})}
											onKeyDown={handleNumericInput}
											onPaste={handleNumericPaste}
										/>
										{errors.noOfFrames && (
											<span className="error">{errors.noOfFrames.message}</span>
										)}
									</div>
								</CardContainer>
								<div className="calculateButtonContainer">
									<Button
										text={isCalculating ? "Calculating..." : "Calculate"}
										disabled={isCalculating}
										className={isCalculating ? "disabled" : ""}
										icon={
											isCalculating ? (
												<Loader className="spinner" size={12} />
											) : undefined
										}
										type="submit"
										style={{ width: "80%" }}
									/>
								</div>
							</div>
							<CardContainer title="Output">
								{isCalculating && (
									<div className="loading-container">
										<Loader className="spinner" size={32} />
										<p>Calculating results...</p>
									</div>
								)}
								{!isCalculating && !results && (
									<p>
										Fill in the "Inputs" card and click "Calculate" to see
										results.
									</p>
								)}
								{!isCalculating && results && (
									<>
										<GridContainerFixed
											style={{
												gap: "0.1rem",
												gridTemplateColumns: "15% 1fr",
											}}
										>
											<InfoLabel label="Reference String:" />
											<InfoValue value={results.referenceString} />
											<InfoLabel label="Number of Frames:" />
											<InfoValue value={results.noOfFrames} />
										</GridContainerFixed>
										<div
											style={{
												margin: "1rem 0",
												display: "flex",
												flexDirection: "column",
												gap: "1rem",
											}}
										>
											<AlgorithmInterfaceComponent
												title={results.fifoResults?.name || ""}
												data={results.fifoResults?.recordOfOutputs || []}
												label="Total Page Faults:"
												value={results.fifoResults?.pageFaults || 0}
											/>
											<AlgorithmInterfaceComponent
												title={results.optResults?.name || ""}
												data={results.optResults?.recordOfOutputs || []}
												label="Total Page Faults:"
												value={results.optResults?.pageFaults || 0}
											/>
											<AlgorithmInterfaceComponent
												title={results.lruResults?.name || ""}
												data={results.lruResults?.recordOfOutputs || []}
												label="Total Page Faults:"
												value={results.lruResults?.pageFaults || 0}
											/>
										</div>
										<div>
											<WhiteContainer
												style={{
													display: "flex",
													flexDirection: "column",
													gap: "1rem",
												}}
											>
												<div
													style={{
														display: "flex",
														alignItems: "center",
														gap: "0.5rem",
													}}
												>
													<Search size={25} />
													<Heading2Text
														text="Analysis"
														style={{ marginTop: "2px" }}
													/>
												</div>
												<div
													style={{
														display: "flex",
														gap: "2rem",
													}}
												>
													<div>
														<table className="analysisTable">
															<thead>
																<tr>
																	<th>Algorithm</th>
																	<th>Page Faults</th>
																</tr>
															</thead>
															<tbody>
																{results.finalResultsTable.map(
																	(result, index) => (
																		<tr key={index}>
																			<td>{result.algorithm}</td>
																			<td>{result.pageFaults}</td>
																		</tr>
																	)
																)}
															</tbody>
														</table>
													</div>
													<FlexContainer style={{ gap: "0.2rem" }}>
														<div
															style={{
																display: "flex",
																flexDirection: "column",
																gap: "0.5rem",
															}}
														>
															<InfoLabel label="Algorithm(s) in this scenario with least total page faults: " />
															<div
																style={{
																	display: "flex",
																	gap: "0.5rem",
																	flexWrap: "wrap",
																}}
															>
																{results.algorithmsWithLeastPageFaults.map(
																	(algorithm, index) => (
																		<HighlightedResultText
																			key={index}
																			text={algorithm?.name || ""}
																		/>
																	)
																)}
															</div>
														</div>
														<div>
															{results.algorithmsWithLeastPageFaults.map(
																(algorithm, index) => (
																	<div key={index}>
																		<InfoLabel
																			label={`Info about ${algorithm?.name}:`}
																		/>
																		<ul className="infoList">
																			{algorithm?.infos.map((info, index) => (
																				<li key={index}>{info}</li>
																			))}
																		</ul>
																	</div>
																)
															)}
														</div>
													</FlexContainer>
												</div>
											</WhiteContainer>
										</div>
									</>
								)}
								<div></div>
							</CardContainer>
						</GridContainerFixed>
					</div>
				</form>
			</LargeContainer>
		</Main>
	);
};

export default ComputationPage;
