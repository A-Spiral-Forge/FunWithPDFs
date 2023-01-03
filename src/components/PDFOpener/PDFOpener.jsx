import React from 'react';
import { Link } from 'react-router-dom';
import WebViewer from '@pdftron/webviewer';

import './PDFOpener.css';

export default class PDFOpener extends React.Component {
	constructor(props) {
		super(props);

		this.viewer = React.createRef();

		this.state = {
			docId: new URLSearchParams(window.location.search).get('id'),
			title: new URLSearchParams(window.location.search)
				.get('title')
				.split(','),
			authors: new URLSearchParams(window.location.search)
				.get('authors')
				.split(','),
			instance: null,
		};
	}

	async printPDFFile() {
		const url = `https://arxiv.org/pdf/${this.state.docId}.pdf`;
		const webViewer = await WebViewer(
			{
				path: './webviewer/lib',
				initialDoc: url,
			},
			this.viewer.current,
		);

		this.setState({
			...this.state,
			instance: {
				Core: {
					Annotations: webViewer.Core.Annotations,
					annotationManager: webViewer.Core.annotationManager,
				},
			},
		});
	}

	async componentDidMount() {
		this.printPDFFile();
	}

	handleAnnotations(instance, rectCoords, color) {
		const { Annotations, annotationManager } = instance.Core;

		const rect = new Annotations.RectangleAnnotation({
			PageNumber: 1,
			X: rectCoords[0],
			Y: rectCoords[2],
			Width: rectCoords[1] - rectCoords[0],
			Height: rectCoords[3] - rectCoords[2],
			StrokeColor: new Annotations.Color(color),
		});

		annotationManager.deleteAnnotations(
			annotationManager.getAnnotationsList()
		);
		annotationManager.addAnnotation(rect);
		annotationManager.redrawAnnotation(rect);
	}

	render() {
		return (
			<div>
				<div className='row'>
					<div className='document'>
						<h1>Document</h1>
						<Link to='/'>Back to Home</Link>
						<div className='tabs'>
							<div>
								<h2>Labels</h2>
								{!this.state.instance ? (
									<ul>Loading..</ul>
								) : (
									<ul className='tabButtons'>
										<button
											onClick={this.handleAnnotations.bind(
												this,
												this.state.instance,
												this.state.title,
												[255, 0, 0]
											)}
										>
											Title
										</button>
										<button
											onClick={this.handleAnnotations.bind(
												this,
												this.state.instance,
												this.state.authors,
												[0, 255, 0]
											)}
										>
											Authors
										</button>
									</ul>
								)}
							</div>
							<div>
								<h2>Boxes</h2>
								<ul className='tabBoxes'>
                                    <li><span className='boxTitle'>Title:</span>
                                        <table>
                                            <tr>
                                                <th>X</th>
                                                <th>Y</th>
                                                <th>Width</th>
                                                <th>Height</th>
                                            </tr>
                                            <tr>
                                                <td>{this.state.title[0]}</td>
                                                <td>{this.state.title[2]}</td>
                                                <td>{this.state.title[1] - this.state.title[0]}</td>
                                                <td>{this.state.title[3] - this.state.title[2]}</td>
                                            </tr>
                                        </table>
                                    </li>
                                    <li><span className='boxTitle'>Authors:</span>
                                        <table>
                                            <tr>
                                                <th>X</th>
                                                <th>Y</th>
                                                <th>Width</th>
                                                <th>Height</th>
                                            </tr>
                                            <tr>
                                                <td>{this.state.authors[0]}</td>
                                                <td>{this.state.authors[2]}</td>
                                                <td>{this.state.authors[1] - this.state.authors[0]}</td>
                                                <td>{this.state.authors[3] - this.state.authors[2]}</td>
                                            </tr>
                                        </table>
                                    </li>
                                </ul>
							</div>
						</div>
					</div>
					<div className='document'>
						<div className='viewer' ref={this.viewer}></div>
					</div>
				</div>
			</div>
		);
	}
}
