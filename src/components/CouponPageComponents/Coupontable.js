import React, { useState, useEffect } from "react";
import CouponModule from "../../modules/couponModule";
import Loading from "../Base/Loading";
import BootstrapSwitchButton from "bootstrap-switch-button-react";

const Coupontable = () => {
  const couponModule = new CouponModule();
  const [coupons, setCoupons] = useState(null);
  useEffect(() => {
    const getCoupons_ = async () => {
      const coupons_ = await couponModule.getCoupons();
      setCoupons(coupons_);
    };
    getCoupons_();
  }, []);
  console.log(coupons);
  return coupons ? (
    <div className="m-4">
      <div className="card shadow mb-4 mt-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">Coupons</h6>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table" width="100%">
              <thead>
                <tr>
                  <th>S No.</th>
                  <th></th>
                  <th>Coupon Name</th>
                  <th></th>
                  <th>Discount</th>
                  <th></th>
                  <th>Category</th>
                  <th></th>
                  <th>Active</th>
                </tr>
              </thead>
              <tbody>
                {coupons.map((coupon, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td></td>
                    <td>{coupon.name}</td>
                    <td></td>
                    <td>{coupon.discount}</td>
                    <td></td>
                    <td>{coupon.category_name}</td>
                    <td></td>
                    <td>
                      <BootstrapSwitchButton
                        style="w-100"
                        onlabel="Active"
                        offlabel="Not Active"
                        checked={coupon.is_active}
                        onstyle="success"
                        offstyle="danger"
                        onChange={(checked) => {
                          let newCoupons = coupons;
                          newCoupons[index] = { ...coupon, is_active: checked };
                          const newCoupon = { ...coupon, is_active: checked };
                          const id = newCoupon.id;
                          delete newCoupon.id;
                          couponModule.updateCoupon(newCoupon, id);
                          setCoupons(newCoupons);
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Coupontable;
