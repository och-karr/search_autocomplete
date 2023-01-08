export interface CarModel {
  readonly model: string;
  readonly description: string;
  readonly brandId: string;
  readonly comfortFeatureIds: string[];
  readonly securityFeatureIds: string[];
  readonly id: string;
}
