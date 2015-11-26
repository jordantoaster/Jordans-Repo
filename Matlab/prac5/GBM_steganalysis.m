function results = GBM_steganalysis(TRN,VAL,TST,settings)
% -------------------------------------------------------------------------
% Contact: jan@kodovsky.com | fridrich@binghamton.edu | January 2013
%          http://dde.binghamton.edu/download
% -------------------------------------------------------------------------
% Copyright (c) 2013 DDE Lab, Binghamton University, NY.
% All Rights Reserved.
% -------------------------------------------------------------------------
% Matlab implementation of the framework for quantitative steganalysis in
% high-dimensional feature spaces as proposed in [1]. The algorithm is
% based on gradient boosting [2] and utilizes different random subspace at
% each stage.
% -------------------------------------------------------------------------
% Input:  TRN ... training set
%         VAL ... validation set
%         TST ... testing set
% Output: results ... collected results, including MSE values on all sets,
%         training time, optimal number of stages, final predictions
% -------------------------------------------------------------------------
% [1] J. Kodovsky and J. Fridrich, Quantitative Steganalysis Using Rich
%     Models, SPIE, Electronic Imaging, Media Watermarking, Security, and
%     Forensics XV, San Francisco, CA, February 3-7, 2013.
% [2] J. H. Friedman, Greedy function approximation: A gradient boosting
%     machine, Annals of Statistics, 29:1189–1232, 2000.
% -------------------------------------------------------------------------
% Permission to use, copy, modify, and distribute this software for
% educational, research and non-profit purposes, without fee, and without a
% written agreement is hereby granted, provided that this copyright notice
% appears in all copies. The program is supplied "as is," without any
% accompanying services from DDE Lab. DDE Lab does not warrant the
% operation of the program will be uninterrupted or error-free. The
% end-user understands that the program was developed for research purposes
% and is advised not to rely exclusively on the program for any reason. In
% no event shall Binghamton University or DDE Lab be liable to any party
% for direct, indirect, special, incidental, or consequential damages,
% including lost profits, arising out of the use of this software. DDE Lab
% disclaims any warranties, and has no obligations to provide maintenance,
% support, updates, enhancements or modifications.
% -------------------------------------------------------------------------


if settings.verbose
    fprintf('---\n');
    fprintf('Quantitative steganalysis\n');
    fprintf(' - gradient boosting, random subspaces\n');
    fprintf(' - training/validation/testing samples: %i/%i/%i\n',size(TRN.F,1),size(VAL.F,1),size(TST.F,1));
    fprintf(' - full dimension: %i | subspace dimension: %i\n',size(TRN.F,2),settings.subspace_dimension);
    fprintf(' - tree levels: %i | PRNG seed %i\n',settings.tree_levels,settings.prng_seed);
    fprintf(' - shrinking parameter: %.3f\n',settings.shrinking_parameter);
end

TIME = tic;

rand('state',settings.prng_seed);

[Ltst,Lval,Ltrn] = deal(TST.payloads,VAL.payloads,TRN.payloads);

% initial estimates - training set mean
Ptrn(:,1) = mean(Ltrn)*ones(size(Ltrn));
Ptst(:,1) = mean(Ltrn)*ones(size(Ltst));
Pval(:,1) = mean(Ltrn)*ones(size(Lval));
% initial values
[MSEtrn,MSEtst,MSEval,stage,converged] = deal(mse(Ptrn,Ltrn),mse(Ptst,Ltst),mse(Pval,Lval),1,false);
if settings.verbose,fprintf('stage %3i | TRN %.4e | VAL %.4e | TST %.4e | %.1f sec\n',stage,MSEtrn,MSEval,MSEtst,toc(TIME)); end

while ~converged
    stage = stage+1;
    % update of Ltrn (gradient, residual error)
    Ltrn = TRN.payloads-Ptrn(:,stage-1);
    % random subspace
    SUB = randperm(size(TRN.F,2));
    SUB = SUB(1:settings.subspace_dimension);
    [Ftrn_sub,Fval_sub,Ftst_sub] = deal(TRN.F(:,SUB),VAL.F(:,SUB),TST.F(:,SUB));
    % base learner training
    base_learner = train_base_learner(double(Ftrn_sub),double(Ltrn),settings,0);
    % apply base learner to training, validation, and testing sets
    Ptst(:,stage) = apply_base_learner(Ftst_sub,base_learner);
    Pval(:,stage) = apply_base_learner(Fval_sub,base_learner);
    Ptrn(:,stage) = apply_base_learner(Ftrn_sub,base_learner);
    % update predictions (+shrinking)
    Ptrn(:,stage) = Ptrn(:,stage-1)+settings.shrinking_parameter*Ptrn(:,stage);
    Ptst(:,stage) = Ptst(:,stage-1)+settings.shrinking_parameter*Ptst(:,stage);
    Pval(:,stage) = Pval(:,stage-1)+settings.shrinking_parameter*Pval(:,stage);
    % update MSE values
    MSEtrn(stage) = mse(Ptrn(:,stage),TRN.payloads);
    MSEval(stage) = mse(Pval(:,stage),VAL.payloads);
    MSEtst(stage) = mse(Ptst(:,stage),TST.payloads);
    if settings.verbose,fprintf('stage %3i | TRN %.4e | VAL %.4e | TST %.4e | %.1f sec\n',stage,MSEtrn(stage),MSEval(stage),MSEtst(stage),toc(TIME)); end
    % simple convergence condition
    [~,ix] = min(MSEval); if stage>ix(1)+10, converged = true; end
end

% collect all information and form the resulting data structure
results.settings = settings;
results.MSE_training_all_stages = MSEtrn;
results.MSE_validation_all_stages = MSEval;
results.MSE_testing_all_stages = MSEtst;
results.optimal_number_of_stages = ix(1);
results.MSE_training_final = MSEtrn(ix(1));
results.MSE_validation_final = MSEval(ix(1));
results.MSE_testing_final = MSEtst(ix(1));
results.final_predictions_training = Ptrn(:,ix(1));
results.final_predictions_testing = Ptst(:,ix(1));
results.final_predictions_validation = Pval(:,ix(1));
results.training_time = toc(TIME);
                             
function base_learner = train_base_learner(Ftrn,L,settings,curr_level,base_learner)
curr_level = curr_level+1;
base_learner.curr_level = curr_level;
[base_learner.split,base_learner.Lv] = get_split(Ftrn,L);
% recursive tree construction
if curr_level<settings.tree_levels
    pred = base_learner.split(Ftrn);
    left_tail = pred==base_learner.Lv;
    [Ftrnleft,Ftrnright] = deal(Ftrn(left_tail,:),Ftrn(~left_tail,:));
    if ~isempty(Ftrnleft) && ~isempty(Ftrnright)
        % left
        base_learner.left  = train_base_learner(Ftrnleft,L(left_tail),settings,curr_level,base_learner);
        % right
        base_learner.right = train_base_learner(Ftrnright,L(~left_tail),settings,curr_level,base_learner);
    end
end    

function pred = apply_base_learner(F,base_learner)
pred = base_learner.split(F);
if isfield(base_learner,'left') && isfield(base_learner,'right')
    left = pred==base_learner.Lv;
    pred(left) = apply_base_learner(F(left,:),base_learner.left);
    pred(~left) = apply_base_learner(F(~left,:),base_learner.right);
end

function r = mse(A,B)
% mean square error
r = mean((A-B).^2);

function [split,Lvalue,Rvalue,THR] = get_split(Ftrn,L)
% OLS regression
sol = [ones(size(Ftrn,1),1) Ftrn]\L;
proj = [ones(size(Ftrn,1),1) Ftrn]*sol;
% search for best threshold
Lvalue = @(thr) mean(L(proj<=thr));
Rvalue = @(thr) mean(L(proj>=thr));
err_new = @(thr) sum((L(proj<=thr)-Lvalue(thr)).^2) + sum((L(proj>=thr)-Rvalue(thr)).^2);
THR = fminbnd(err_new,min(proj)+eps,max(proj)-eps);
% form the node
Lvalue = mean(L(proj<=THR));
Rvalue = mean(L(proj>=THR));
P = @(F) [ones(size(F,1),1) F]*sol;
split = @(F) (P(F)<=THR)*Lvalue + (P(F)>=THR)*Rvalue;
