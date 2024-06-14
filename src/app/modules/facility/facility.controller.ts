import { NextFunction, Request, Response } from 'express';
import { createFacility, getAllFacilities, updateFacility, deleteFacility } from './facility.service';
import { facilitySchema } from './facility.validation';
import errorHandler from '../../middlewares/errorHandler';

export const addFacility = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const facilityData = facilitySchema.parse(req.body);
    const facility = await createFacility(facilityData);
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Facility added successfully',
      data: facility
    });
  } catch (error) {
    // res.status(400).json({ success: false, message: error.message });
  errorHandler(error as Error,req,res,next);
  }
};

export const getFacilities = async (req: Request, res: Response,next: NextFunction) => {
  try {
    const facilities = await getAllFacilities();
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Facilities retrieved successfully',
      data: facilities
    });
  } catch (error) {
    errorHandler(error as Error,req,res,next);
  }
};

export const editFacility = async (req: Request, res: Response,next: NextFunction) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const facility = await updateFacility(id, updateData);
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Facility updated successfully',
      data: facility
    });
  } catch (error) {
    errorHandler(error as Error,req,res,next);
  }
};
export const removeFacility = async (req: Request, res: Response,next: NextFunction) => {
  try {
    const { id } = req.params;
    const facility = await deleteFacility(id);
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Facility deleted successfully',
      data: facility
    });
  } catch (error) {
    errorHandler(error as Error,req,res,next);
  }
};
