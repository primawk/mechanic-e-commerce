import React from "react";
import Axios from "axios";
import { API_URL } from "../constants/API";
import "../assets/styles/admin.css";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";

class Admin extends React.Component {
  state = {
    productList: [],
    addAlbum: "",
    addPrice: 0,
    addPhoto: "",
    addArtist: "",
    addGenre: "",
    addLabel: "",
    addCountry: "",
    addReleased: "",
    editId: 0,
    editAlbum: "",
    editPrice: 0,
    editPhoto: "",
    editArtist: "",
    editGenre: "",
    editLabel: "",
    editCountry: "",
    editReleased: "",
  };

  idrFormatter = (val) => {
    return Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(val);
  };

  fetchProducts = () => {
    Axios.get(`${API_URL}/products`).then((result) => {
      this.setState({ productList: result.data });
    });
  };

  editToggle = (editData) => {
    this.setState({
      editId: editData.id,
      editAlbum: editData.album,
      editPrice: editData.price,
      editPhoto: editData.photo,
      editArtist: editData.artist,
      editGenre: editData.genre,
      editLabel: editData.label,
      editCountry: editData.country,
      editReleased: editData.released,
    });
  };



  cancelEdit = () => {
    this.setState({ editId: 0 });
  };

  saveBtnHandler = () => {
    Axios.patch(`${API_URL}/products/${this.state.editId}`, {
      album: this.state.editAlbum,
      price: parseInt(this.state.editPrice),
      photo: this.state.editPhoto,
      artist: this.state.editArtist,
      genre: this.state.editGenre,
      label: this.state.editLabel,
      country: this.state.editCountry,
      released: this.state.editReleased,
    })
    .then(() => {
      this.fetchProducts()
      this.cancelEdit();
    })
    .catch(() => {
      alert("Terjadi kesalahan")
    })
  }

  deleteBtnHandler = (deleteId) => {
    const confirmDelete = window.confirm("Are you sure?");
    if (confirmDelete) {
      Axios.delete(`${API_URL}/products/${deleteId}`)
      .then(() => {
        this.fetchProducts();
      })
      .catch(() => {
        alert("Error!")
      })
    } else {
      alert("Cancelled");
    }
  }

  renderProducts = () => {
    return this.state.productList.map((val) => {
      if (val.id === this.state.editId) {
        return (
          <tr>
            <td>{val.id}</td>
            <td>
              <input
                value={this.state.editAlbum}
                onChange={this.inputHandler}
                type="text"
                className="form-control"
                name="editAlbum"
                placeholder="Album"
              />
            </td>
            <td>
              <input
                value={this.state.editPrice}
                onChange={this.inputHandler}
                type="number"
                className="form-control"
                name="editPrice"
                placeholder="Price"
              />
            </td>
            <td>
              <input
                value={this.state.editPhoto}
                onChange={this.inputHandler}
                type="text"
                className="form-control"
                name="editPhoto"
                placeholder="Photo"
              />
            </td>
            <td>
              <input
                value={this.state.editArtist}
                onChange={this.inputHandler}
                type="text"
                className="form-control"
                name="editArtist"
                placeholder="Artist"
              />
            </td>
            <td>
              <input
                value={this.state.editGenre}
                onChange={this.inputHandler}
                type="text"
                className="form-control"
                name="editGenre"
                placeholder="Genre"
              />
            </td>
            <td>
              <input
                value={this.state.editLabel}
                onChange={this.inputHandler}
                type="text"
                className="form-control"
                name="editLabel"
                placeholder="Label"
              />
            </td>
            <td>
              <input
                value={this.state.editCountry}
                onChange={this.inputHandler}
                type="text"
                className="form-control"
                name="editCountry"
                placeholder="Country"
              />
            </td>
            <td>
              <input
                value={this.state.editReleased}
                onChange={this.inputHandler}
                type="text"
                className="form-control"
                name="editReleased"
                placeholder="Released"
              />
            </td>

            <td>
              <button onClick={this.saveBtnHandler} className="btn btn-success">
                Save
              </button>
            </td>
            <td>
              <button onClick={this.cancelEdit} className="btn btn-danger">
                Cancel
              </button>
            </td>
          </tr>
        );
      }
      return (
        <tr>
          <td>{val.id}</td>
          <td>{val.album}</td>
          <th>{this.idrFormatter(val.price)}</th>
          <th>
            <img className="admin-product-image" src={val.photo} alt="" />
          </th>
          <th>{val.artist}</th>
          <th>{val.genre}</th>
          <th>{val.label}</th>
          <th>{val.country}</th>
          <th>{val.released}</th>
          <td>
            <button
              onClick={() => this.editToggle(val)}
              className="btn btn-secondary"
            >
              Edit
            </button>
          </td>
          <td>
            <button onClick={() => this.deleteBtnHandler(val.id)} className="btn btn-danger">Delete</button>
          </td>
        </tr>
      );
    });
  };

  addNewProduct = () => {
    Axios.post(`${API_URL}/products`, {
      album: this.state.addAlbum,
      price: parseInt(this.state.addPrice),
      photo: this.state.addPhoto,
      artist: this.state.addArtist,
      genre: this.state.addGenre,
      label: this.state.addLabel,
      country: this.state.addCountry,
      released: this.state.addReleased,
    })
      .then(() => {
        this.fetchProducts();
        this.setState({
          addAlbum: "",
          addPrice: 0,
          addPhoto: "",
          addArtist: "",
          addGenre: "",
          addLabel: "",
          addCountry: "",
          addReleased: "",
        });
      })
      .catch(() => {
        alert("Unable to add");
      });
  };

  inputHandler = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  componentDidMount() {
    this.fetchProducts();
  }

  render() {
    if (this.props.userGlobal.role !== "admin") {
      return <Navigate to="/" />;
    }

    return (
      <div className="p-5">
        <div className="row">
          <div className="col-12 text-center">
            <h1>Manage Products</h1>
            <table className="table mt-4">
              <thead className="thead-light">
                <tr>
                  <th>ID</th>
                  <th>Album</th>
                  <th>Price</th>
                  <th>Photo</th>
                  <th>Artist</th>
                  <th>Genre</th>
                  <th>Label</th>
                  <th>Country</th>
                  <th>Released</th>
                  <th colSpan="2">Action</th>
                </tr>
              </thead>
              <tbody>{this.renderProducts()}</tbody>
              <tfoot className="bg-light">
                <tr>
                  <td></td>
                  <td>
                    <input
                      value={this.state.addAlbum}
                      onChange={this.inputHandler}
                      name="addAlbum"
                      type="text"
                      placeholder="Album"
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      value={this.state.addPrice}
                      onChange={this.inputHandler}
                      name="addPrice"
                      type="number"
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      value={this.state.addPhoto}
                      onChange={this.inputHandler}
                      name="addPhoto"
                      type="text"
                      placeholder="Photo URL"
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      value={this.state.addArtist}
                      onChange={this.inputHandler}
                      name="addArtist"
                      type="text"
                      placeholder="Artist"
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      value={this.state.addGenre}
                      onChange={this.inputHandler}
                      name="addGenre"
                      type="text"
                      placeholder="Genre"
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      value={this.state.addLabel}
                      onChange={this.inputHandler}
                      name="addLabel"
                      type="text"
                      placeholder="Label"
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      value={this.state.addCountry}
                      onChange={this.inputHandler}
                      name="addCountry"
                      type="text"
                      placeholder="Country"
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      value={this.state.addReleased}
                      onChange={this.inputHandler}
                      name="addReleased"
                      type="text"
                      placeholder="Released in"
                      className="form-control"
                    />
                  </td>

                  <td colSpan="2">
                    <button
                      onClick={this.addNewProduct}
                      className="btn btn-info"
                    >
                      Add Product
                    </button>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userGlobal: state.user
  }
}

export default connect(mapStateToProps)(Admin);
