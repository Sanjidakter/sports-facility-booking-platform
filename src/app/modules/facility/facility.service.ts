import { Facility } from './facility.model';
import { IFacility } from './facility.interface';

export const createFacility = async (facilityData: IFacility) => {
  const facility = new Facility(facilityData);
  await facility.save();
  return facility;
};

export const getAllFacilities = async () => {
  const facilities =  await Facility.find({ isDeleted: false });
  if (facilities.length === 0) {
    throw new Error('NoDataFound');
  }
  return facilities;
};

export const updateFacility = async (id: string, updateData: Partial<IFacility>) => {
  return await Facility.findByIdAndUpdate(id, updateData, { new: true });
};

export const deleteFacility = async (id: string) => {
  return await Facility.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
};
