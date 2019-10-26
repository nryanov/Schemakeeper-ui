import React from 'react'
import {connect} from 'react-redux'
import {updateSubjectMeta} from "../redux/actions";

class SubjectInfoModal extends React.Component {
    constructor(props) {
        super(props);

        this.state= {};

        this.clearInputs = this.clearInputs.bind(this);
        this.save = this.save.bind(this);
        this.lock = this.lock.bind(this);
        this.compatibilityType = this.compatibilityType.bind(this);
    }

    static getDerivedStateFromProps(props, state) {
        if (!state || props.subject !== state.subject) {
            return {
                ...props
            }
        } else {
            return {
                ...props,
                ...state
            }
        }
    }

    clearInputs() {
        this.setState({
            ...this.props

        })
    }

    save() {
        this.props.updateSubjectMeta(this.state.subject, this.state.compatibilityType, this.state.isLocked);
        this.clearInputs();
    }

    lock(flag) {
        this.setState({
            ...this.state,
            isLocked: flag
        })
    }

    compatibilityType(e) {
        this.setState({
            ...this.state,
            compatibilityType: e.target.value
        })
    }

    render() {
        return (
            <div className="modal fade" id="updateSubjectMetaModal" tabIndex="-1" role="dialog"
                 aria-labelledby="updateSubjectMetaModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="updateSubjectMetaModalLabel">{this.props.subject}</h5>
                            <button type="button" onClick={this.clearInputs} className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="updateSubjectMetaModalCompatibilityType">Compatibility type</label>
                                    <select className="form-control" onChange={(e) => this.compatibilityType(e)} value={this.state.compatibilityType} id="updateSubjectMetaModalCompatibilityType">
                                        <option value={"none"}>NONE</option>
                                        <option value={"backward"}>BACKWARD</option>
                                        <option value={"forward"}>FORWARD</option>
                                        <option value={"full"}>FULL</option>
                                        <option value={"backward_transitive"}>BACKWARD_TRANSITIVE</option>
                                        <option value={"forward_transitive"}>FORWARD_TRANSITIVE</option>
                                        <option value={"full_transitive"}>FULL_TRANSITIVE</option>
                                    </select>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="lockStatus" id="unlocked" onChange={() => this.lock(false)} checked={!this.state.isLocked}/>
                                    <label className="form-check-label" htmlFor="unlocked">Unlocked</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="lockStatus" id="locked" onChange={() => this.lock(true)} checked={this.state.isLocked}/>
                                    <label className="form-check-label" htmlFor="locked">Locked</label>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.clearInputs}>
                                Close
                            </button>
                            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.save}>
                                Save changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const SubjectInfo = ({subject, compatibilityType, isLocked, updateSubjectMeta}) => (
    <>
        <SubjectInfoModal subject={subject} compatibilityType={compatibilityType} isLocked={isLocked} updateSubjectMeta={updateSubjectMeta}/>
        <div className="tab-pane fade show active" id="info" role="tabpanel" aria-labelledby="info-tab">
            <ul className="list-unstyled mt-4">
                <li><strong>Subject name:</strong> {subject}</li>
                <li><strong>Compatibility type: </strong> {compatibilityType}</li>
                <li><strong>Locked: </strong> {isLocked ? "true" : "false"}</li>
            </ul>
            <form className="form-inline">
                <button className="btn btn-outline-success" type="button" data-toggle="modal" data-target="#updateSubjectMetaModal">
                    Settings
                </button>
            </form>
        </div>
    </>
);

const mapStateToProps = state => ({
    ...state.selectedSubject.info
});

const mapDispatchToProps = dispatch => ({
    updateSubjectMeta(subjectName, compatibilityType, isLocked) {
        dispatch(updateSubjectMeta(subjectName, compatibilityType, isLocked))
    }
});

const SubjectInfoContainer = connect(mapStateToProps, mapDispatchToProps)(SubjectInfo);

export default SubjectInfoContainer;